class EnergyPricingPlanSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name

  attribute :energy_pricing_groups do |object|
    object.energy_pricing_groups.map do |group|
      {
        name: group.name,
        time_of_use: group.time_of_uses.map(&:hour),
        tiers:
          group.energy_pricing_tiers.map do |tier|
            { rate: tier.rate, min: tier.min, max: tier.max }
          end
      }
    end
  end
end
