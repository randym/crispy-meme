class TimeOfUse < ApplicationRecord
  belongs_to :energy_pricing_group

  validates :hour,
            presence: true,
            numericality: {
              only_integer: true,
              greater_than_or_equal_to: 0,
              less_than_or_equal_to: 23
            }

  validates :hour, uniqueness: { scope: :energy_pricing_group_id }
end
