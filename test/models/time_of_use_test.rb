require "test_helper"

class TimeOfUseTest < ActiveSupport::TestCase
  def setup
  end

  test "should be valid with valid attributes" do
    sut =
      TimeOfUse.new(hour: 0, energy_pricing_group: energy_pricing_groups(:one))
    assert sut.valid?, "TimeOfUse was not valid with valid attributes"
  end

  test "should be invalid with no hour" do
    sut = TimeOfUse.new(energy_pricing_group: energy_pricing_groups(:one))
    assert_not sut.valid?, "TimeOfUse was valid without an hour"
  end

  test "should be invalid with an hour less than 0" do
    sut =
      TimeOfUse.new(hour: -1, energy_pricing_group: energy_pricing_groups(:one))
    assert_not sut.valid?, "TimeOfUse was valid with an invalid hour"
  end
  test "should be invalid with an hour greater than 23" do
    sut =
      TimeOfUse.new(hour: 24, energy_pricing_group: energy_pricing_groups(:one))
    assert_not sut.valid?, "TimeOfUse was valid with an invalid hour"
  end

  test "should be invalid with duplicate hour in energy pricing group" do
    TimeOfUse.create(hour: 0, energy_pricing_group: energy_pricing_groups(:one))
    sut =
      TimeOfUse.new(hour: 0, energy_pricing_group: energy_pricing_groups(:one))
    assert_not sut.valid?, "TimeOfUse was valid with a duplicate hour"
  end
end
