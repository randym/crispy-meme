class HomeController < ApplicationController
  def index
  end

  if Rails.env.development? || Rails.env.test?
    def make_me_an_error
      raise StandardError,
            "This is a test error to verify our rescue_from StandardError works."
    end
  end
end
