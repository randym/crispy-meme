Rails.application.routes.draw do
  root "home#index"

  only_json_api =
    lambda do |req|
      req.format.json? || req.headers["Accept"] =~ %r{application/json}
    end

  constraints only_json_api do
    resources :cities, only: %i[index show] do
      resources :households, only: %i[index show]
    end

    resources :households, only: %i[index show] do
      resources :city, only: %i[show]
    end
  end

  if Rails.env.development? || Rails.env.test?
    get "make_me_an_error", to: "home#make_me_an_error"
  end

  get "*path",
      to: "home#index",
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
