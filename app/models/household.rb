class Household < ApplicationRecord
  belongs_to :city

  has_many :energy_productions,
           foreign_key: :household_ref,
           primary_key: :ref,
           dependent: :destroy

  validates :ref, presence: true, uniqueness: true
  validates :city, presence: true
end
