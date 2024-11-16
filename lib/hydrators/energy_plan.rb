module Hydrators
  class EnergyPlan
    class << self
      def hydrate(plan_data)
        plan = EnergyPricingPlan.create!(name: plan_data[:name])
        plan_data[:groups].each do |group_data|
          group = plan.energy_pricing_groups.create!(name: group_data[:name])
          if group_data[:hours]
            group.time_of_uses.create!(
              group_data[:hours].map { |hour| { hour: hour } }
            )
          end
          group_data[:tiers].each do |tier_data|
            group.energy_pricing_tiers.create!(
              rate: tier_data[:rate],
              min: tier_data[:min] || 0,
              max: tier_data[:max] || Float::INFINITY
            )
          end
        end
      end
    end
  end
end
