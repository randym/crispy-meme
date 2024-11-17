class EnergyPricingTier < ApplicationRecord
  belongs_to :energy_pricing_group

  validates :rate, presence: true
  validates :min, presence: true
  validates :max, presence: true

  validates :rate, numericality: { greater_than: 0 }

  validate :min_less_than_max
  validate :no_overlapping_tiers

  def cost_for(kwh)
    if kwh > min
      tier_kwh = [kwh - min, max - min].min
      tier_kwh * rate
    else
      0
    end
  end

  def explain_cost_for(kwh)
    tier_kwh = kwh > min ? [kwh - min, max - min].min : 0
    cost = cost_for(kwh)

    {
      kwh: kwh,
      min: min,
      max: max,
      rate: rate,
      tier_kwh: tier_kwh,
      tier_cost: cost
    }
  end

  private

  def min_less_than_max
    if min.present? && max.present? && min >= max
      errors.add(:max, "must be greater than min")
    end
  end

  def no_overlapping_tiers
    overlapping =
      energy_pricing_group
        .energy_pricing_tiers
        .where.not(id: id)
        .where("min < :max AND max > :min", max: max, min: min)

    unless overlapping.empty?
      errors.add(:base, "Overlapping tiers are not allowed")
    end
  end
end
