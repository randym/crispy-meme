class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  # allow_browser versions: :modern, mobile: true

  unless Rails.env.development?
    rescue_from StandardError, with: :internal_server_error
  end

  rescue_from ActionController::RoutingError, with: :route_not_found
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  private

  ERROR_MESSAGES = [
    "By Grabthar's hammer, you shall be avenged!",
    "I'm sorry, Dave. I'm afraid I can't do that.",
    "The cake is a lie.",
    "Our flux capacitor is out of sync.",
    "We've gone to plaid!",
    "The computer says no."
  ]

  def internal_server_error(exception)
    render json: {
             error: ERROR_MESSAGES.sample
           },
           status: :internal_server_error
  end

  def record_not_found(exception)
    render json: { error: exception.message }, status: :not_found
  end

  def route_not_found(exception)
    render json: { error: :not_found }, status: :not_found
  end
end
