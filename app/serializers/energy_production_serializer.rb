class EnergyProductionSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower

  attributes :household_ref, :production_month, :kwh, :temperature, :daylight
end
