class EnergyPricingPlansController < ApplicationController
  include Paginatable
  before_action :require_readings, only: :calculate
  skip_before_action :verify_authenticity_token, only: :calculate

  def index
    render json: serialize(EnergyPricingPlan.page(page).per(per))
  end

  def show
    render json: serialize(energy_pricing_plan)
  end

  def calculate
    render json: serialize_calculate
  end

  private

  def require_readings
    params.require(:readings)
  end

  def energy_charge
    @energy_charge ||= energy_pricing_plan.cost_for(readings)
  end

  def energy_charge_detail
    @energy_charge_detail ||= energy_pricing_plan.explain_cost_for(readings)
  end

  def readings
    @readings ||= params[:readings]
  end

  def energy_pricing_plan
    @energy_pricing_plan ||= EnergyPricingPlan.find(params[:id])
  end

  def serialize_calculate
    EnergyPricingPlanCalculationSerializer.new(
      energy_pricing_plan,
      {
        params: {
          energy_charge: energy_charge,
          energy_charge_detail: energy_charge_detail
        }
      }
    ).serialized_json
  end

  def serialize(object)
    EnergyPricingPlanSerializer.new(object).serialized_json
  end
end
