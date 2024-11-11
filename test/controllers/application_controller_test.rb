require "test_helper"
class ApplicationControllerTest < ActionDispatch::IntegrationTest
  test "should succeed on text/html root request" do
    get root_url()
    assert_response :success
  end

  test "it returns not found for models not found" do
    get_json(city_url(id: 10))

    assert_response :not_found
    assert_equal response.json["error"], "Couldn't find City with 'id'=10"
  end

  test "it returns json error 'not found' on unknown route" do
    get_json("/somwhere/over/the/rainbow")

    assert_response :not_found
    assert_equal response.json["error"], "Not Found"
  end
  test "rescues standard error with one of our error messages" do
    get_json(make_me_an_error_url)

    assert_response :internal_server_error
    assert_includes ApplicationController::ERROR_MESSAGES,
                    response.json["error"]
  end
end
