require "test_helper"

class HouseholdTest < ActiveSupport::TestCase
  setup do
    @ref = households.last.ref + 1
    @city = cities(:one)
  end
  test "should not save household without city" do
    sut = Household.new(resident_count: 1, ref: @ref)
    assert_not sut.save, "Saved the household without a city"
  end

  test "should not save household without ref" do
    sut = Household.new(resident_count: 1, city: @city)
    assert_not sut.save, "Saved the household with a ref"
  end

  test "saves with valid attributes" do
    sut = Household.new(resident_count: 1, city: @city, ref: @ref)
    assert sut.save, "Did not save the household with valid attributes"
  end
end
