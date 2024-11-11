require "test_helper"

class CityTest < ActiveSupport::TestCase
  test "should not save city without name" do
    sut = City.new
    assert_not sut.save, "Saved the city without a name"
  end

  test "should not save city with duplicate name" do
    sut = City.new(name: cities(:one).name)
    assert_not sut.save, "Saved the city with a duplicate name"
  end

  test "saves with valid attributes" do
    sut = City.new(name: "City")
    assert sut.save, "Did not save the city with valid attributes"
  end
  # test "the truth" do
  #   assert true
  # end
end
