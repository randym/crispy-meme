require "test_helper"

class EnergyProductionTest < ActiveSupport::TestCase
  setup do
    @ref = energy_productions.last.ref + 1
    @household = households(:one)
    @production_month = EnergyProduction.all.last.production_month + 1.month
  end
  test "should not save energy production without ref" do
    sut =
      EnergyProduction.new(
        production_month: "2019-01-01",
        household: @household
      )
    assert_not sut.save, "Saved the energy production without a ref"
  end

  test "should not save energy production without household" do
    sut = EnergyProduction.new(production_month: "2019-01-01", ref: @ref)
    assert_not sut.save, "Saved the energy production without a household"
  end

  test "should not save energy production without production month" do
    sut = EnergyProduction.new(ref: @ref, household: @household)
    assert_not sut.save,
               "Saved the energy production without a production month"
  end

  test "saves with valid attributes" do
    sut =
      EnergyProduction.new(
        ref: @ref,
        household: @household,
        production_month: @production_month
      )
    assert sut.save, "Did not save the energy production with valid attributes"
  end
end
