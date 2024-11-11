ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

# pull in support
Dir[Rails.root.join("test", "support", "**", "*.rb")].each { |f| require f }

module ActiveSupport
  class TestCase
    # do NOT return descriptive error pages in test environment
    setup { Rails.application.config.consider_all_requests_local = false }

    # Run tests in parallel with specified workers
    parallelize(workers: :number_of_processors)

    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    # Add more helper methods to be used by all tests here...

    # dry out our json requests
    def get_json(url, params: {}, headers: {})
      get url,
          params: params,
          headers: headers.merge("Accept" => "application/json")
    end
  end
end

# Prepend the JSONResponseExtensions module to ActionDispatch::TestResponse
ActionDispatch::TestResponse.prepend(JSONResponseExtensions)
