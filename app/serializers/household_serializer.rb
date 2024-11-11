class HouseholdSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower

  has_many :energy_productions
  belongs_to :city

  attributes :ref, :last_name, :first_name, :has_children, :resident_count

  attribute :city do |object|
    object.city.name
  end
end
