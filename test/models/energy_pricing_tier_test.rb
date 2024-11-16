require "test_helper"

class EnergyPricingTierTest < ActiveSupport::TestCase
  def setup
    @energy_pricing_group = energy_pricing_groups(:one)
    @safe_max = energy_pricing_tiers(:one).max + 1
    @safe_min = energy_pricing_tiers(:one).max
  end

  test "should be valid with valid attributes" do
    sut =
      EnergyPricingTier.new(
        rate: 0.1,
        min: @safe_min,
        max: @safe_max,
        energy_pricing_group: @energy_pricing_group
      )
    assert sut.valid?, "EnergyPricingTier was not valid with valid attributes"
  end

  test "should be invalid with no rate" do
    sut =
      EnergyPricingTier.new(
        min: @safe_min,
        max: @safe_max,
        energy_pricing_group: @energy_pricing_group
      )
    assert_not sut.valid?, "EnergyPricingTier was valid without a rate"
  end

  test "should be invalid with no min" do
    sut =
      EnergyPricingTier.new(
        rate: 0.1,
        max: @safe_max,
        energy_pricing_group: @energy_pricing_group
      )
    assert_not sut.valid?, "EnergyPricingTier was valid without a min"
  end

  test "should be invalid with no max" do
    sut =
      EnergyPricingTier.new(
        rate: 0.1,
        min: @safe_min,
        energy_pricing_group: @energy_pricing_group
      )
    assert_not sut.valid?, "EnergyPricingTier was valid without a max"
  end

  test "should be invalid with a rate less than 0" do
    sut =
      EnergyPricingTier.new(
        rate: -0.1,
        min: @safe_min,
        max: @safe_max,
        energy_pricing_group: @energy_pricing_group
      )
    assert_not sut.valid?, "EnergyPricingTier was valid with an invalid rate"
  end

  test "should be invalid with a min greater than or equal to max" do
    sut =
      EnergyPricingTier.new(
        rate: 0.1,
        min: @safe_max,
        max: @safe_min,
        energy_pricing_group: @energy_pricing_group
      )
    assert_not sut.valid?, "EnergyPricingTier was valid with an invalid min"
  end

  test "should be invalid with overlapping tiers in the same group" do
    sut =
      EnergyPricingTier.new(
        rate: 0.1,
        min: @safe_min - 1,
        max: @safe_max,
        energy_pricing_group: @energy_pricing_group
      )

    assert_not sut.valid?, "EnergyPricingTier was valid with overlapping tiers"
  end
end
