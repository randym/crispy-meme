require "test_helper"
require_relative "../fixtures/files/meter_readings"
class EnergyPricingPlanControllerTest < ActionDispatch::IntegrationTest
  test "it returns the correct serialization for a single energy pricing plan" do
    get_json(energy_pricing_plan_url(energy_pricing_plans(:one)))
    assert_equal Serializations.energy_pricing_plan, response.json
  end

  test "it returns the correct serialization for all energy pricing plans" do
    get_json(energy_pricing_plans_url)
    assert_equal Serializations.energy_pricing_plans, response.json
  end

  test "it returns the correct calculation" do
    post_json(
      calculate_energy_pricing_plan_url(energy_pricing_plans(:one)),
      body: {
        readings: READINGS
      }
    )

    assert_equal Serializations.energy_pricing_plan_calculate, response.json
  end
end
