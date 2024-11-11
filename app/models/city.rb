class City < ApplicationRecord
  has_many :households, dependent: :destroy

  has_many :energy_productions,
           through: :households,
           foreign_key: :household_ref,
           primary_key: :ref

  validates :name, presence: true, uniqueness: true
end
