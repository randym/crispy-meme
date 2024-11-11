class CitySerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  has_many :households
  has_many :energy_productions,
           through: :households,
           foreign_key: :household_ref,
           primary_key: :refs
  attributes :name
end

class Other
  include FastJsonapi::ObjectSerializer
  attribute :households do |object|
    HouseholdSerializer.new(
      object.households,
      { params: { skip_energy_productions: true } }
    )
  end

  attribute :energy_productions do |object|
    EnergyProductionSerializer.new(object.energy_productions)
  end
end
