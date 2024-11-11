class EnergyProduction < ApplicationRecord
  belongs_to :household, foreign_key: :household_ref, primary_key: :ref

  validates :ref, presence: true, uniqueness: true
  validates :household_ref, presence: true
  validates :production_month, presence: true
end
