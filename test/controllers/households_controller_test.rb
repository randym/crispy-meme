require "test_helper"

class HouseholdsControllerTest < ActionDispatch::IntegrationTest
  test "it paginates" do
    get_json(households_url(page: 1, per: 2))
    data = response.json["data"]

    assert_equal 2, data.length
    assert_equal households(:one).id.to_s, data[0]["id"]
    assert_equal households(:two).id.to_s, data[1]["id"]

    get_json(households_url(page: 2, per: 2))
    data = response.json["data"]

    assert_equal 2, data.length
    assert_equal households(:three).id.to_s, data[0]["id"]
    assert_equal households(:four).id.to_s, data[1]["id"]
  end

  test "return household serialization" do
    get_json(household_url(households(:one)))
    assert_equal Serializations.household, response.json
  end

  test "returns households serialization" do
    get_json(households_url)
    assert_equal Serializations.households, response.json
  end
end
