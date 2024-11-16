require "test_helper"
require_relative "../fixtures/files/meter_readings"
require_relative "../fixtures/files/energy_pricing_plans"
class EnergyPricingPlanTest < ActiveSupport::TestCase
  setup { @energy_pricing_plan = energy_pricing_plans(:one) }
  test "should be valid with valid attributes" do
    sut = EnergyPricingPlan.new(name: "Test")
    assert sut.valid?, "EnergyPricingPlan was not valid with valid attributes"
  end

  test "should be invalid with no name" do
    sut = EnergyPricingPlan.new
    assert_not sut.valid?, "EnergyPricingPlan was valid without a name"
  end

  test "should be invalid with a duplicate name" do
    sut = EnergyPricingPlan.new(name: @energy_pricing_plan.name)
    assert_not sut.valid?, "EnergyPricingPlan was valid with a duplicate name"
  end

  test "we can correctly calculate the total energy cost for this plan" do
    Hydrators::EnergyPlan.hydrate(PLANS[0])
    plan = EnergyPricingPlan.find_by(name: PLANS[0][:name])

    assert_equal 2697.943074512807, plan.cost_for(READINGS)
  end
end
