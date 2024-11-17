class EnergyPricingPlanCalculationSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower

  attributes :name
  attribute :energy_charge do |object, params|
    params[:energy_charge]
  end

  attribute :energy_charge_detail do |object, params|
    params[:energy_charge_detail]
  end
end
