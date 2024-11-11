require "test_helper"

class CitiesControllerTest < ActionDispatch::IntegrationTest
  test "should paginate" do
    get_json(cities_url(page: 1, per: 1))

    assert_equal 1, response.json["data"].length
    assert_equal cities(:one).id.to_s, response.json["data"][0]["id"]

    get_json(cities_url(page: 2, per: 1))

    assert_equal 1, response.json["data"].length
    assert_equal cities(:two).id.to_s, response.json["data"][0]["id"]
  end

  test "returns city serialization on /city/[id]" do
    get_json(city_url(cities(:one)))

    assert_equal Serializations.city, response.json
  end

  test "returns cities serializations on /cities" do
    get_json(cities_url())

    assert_equal Serializations.cities, response.json
  end
end
