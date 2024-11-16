require "test_helper"

class EnergyPricingGroupTest < ActiveSupport::TestCase
  setup { @energy_pricing_plan = energy_pricing_plans(:one) }

  test "should be valid with valid attributes" do
    sut =
      EnergyPricingGroup.new(
        name: "Test",
        energy_pricing_plan: @energy_pricing_plan
      )
    assert sut.valid?, "EnergyPricingGroup was not valid with valid attributes"
  end

  test "should be invalid with no name" do
    sut = EnergyPricingGroup.new(energy_pricing_plan: @energy_pricing_plan)
    assert_not sut.valid?, "EnergyPricingGroup was valid without a name"
  end

  test "should be invalid with a duplicate name in energy pricing plan" do
    EnergyPricingGroup.create(
      name: "Test",
      energy_pricing_plan: @energy_pricing_plan
    )
    sut =
      EnergyPricingGroup.new(
        name: "Test",
        energy_pricing_plan: @energy_pricing_plan
      )
    assert_not sut.valid?, "EnergyPricingGroup was valid with a duplicate name"
  end
end
