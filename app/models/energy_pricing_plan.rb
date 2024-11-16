class EnergyPricingPlan < ApplicationRecord
  has_many :energy_pricing_groups, dependent: :destroy
  has_many :energy_pricing_tiers, through: :energy_pricing_groups

  validates :name, presence: true, uniqueness: true

  def cost_for(readings)
    validate_readings_fomat(readings)
    energy_pricing_groups.sum { |group| group.cost_for(readings) }
  end

  def explain_cost_for(readings)
    validate_readings_fomat(readings)
    energy_pricing_groups.map { |group| group.explain_cost_for(readings) }
    puts "Total Cost: #{cost_for(readings)}"
  end

  private

  def validate_readings_fomat(readings)
    unless readings.is_a?(Array) &&
             readings.all? { |r|
               r.is_a?(Array) && r.all? { |data| data.is_a?(Numeric) }
             }
      raise ArgumentError, "Readings must be a 2D array of numeric values"
    end
  end
end
