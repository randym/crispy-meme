class EnergyPricingGroup < ApplicationRecord
  belongs_to :energy_pricing_plan
  has_many :energy_pricing_tiers, dependent: :destroy
  has_many :time_of_uses, dependent: :destroy

  validates :name,
            presence: true,
            uniqueness: {
              scope: :energy_pricing_plan_id
            }

  def cost_for(readings)
    hours = time_of_uses.pluck(:hour)
    # Determine the total kWh for the readings that apply to this group
    total_kwh =
      readings.sum do |day|
        if hours.empty?
          day.sum
        else
          day
            .each_with_index
            .reduce(0) do |sum, (kwh, hour)|
              hours.include?(hour) ? sum + kwh : sum
            end
        end
      end

    # Calculate the cost based on the total kWh and the pricing tiers
    energy_pricing_tiers.sum { |tier| tier.cost_for(total_kwh) }
  end

  def explain_cost_for(readings)
    hours = time_of_uses.pluck(:hour)
    puts "------"
    puts "Explaining cost for #{name} group"
    puts "------"
    puts "filter for hours: #{hours}"
    # Determine the total kWh for the readings that apply to this group
    total_kwh =
      readings.sum do |day|
        if hours.empty?
          day.sum
        else
          day
            .each_with_index
            .reduce(0) do |sum, (kwh, hour)|
              hours.include?(hour) ? sum + kwh : sum
            end
        end
      end

    # Calculate the cost based on the total kWh and the pricing tiers
    energy_pricing_tiers.each { |tier| tier.explain_cost_for(total_kwh) }
    puts "Group Cost: #{cost_for(readings)}"
    puts ""
  end
end
