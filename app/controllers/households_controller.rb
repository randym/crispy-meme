class HouseholdsController < ApplicationController
  include Paginatable

  def index
    render json: serialize(households.page(page).per(per))
  end

  def show
    render json: serialize(household)
  end

  private

  def households
    (city ? city.households.page(page).per(per) : Household)
  end

  def household
    Household.find(params[:id])
  end

  def include
    return [] unless params[:include]
    Array.wrap(params[:include]).map { |s| s.underscore.to_sym }
  end

  def city
    @city ||= City.find(params[:city_id]) if params[:city_id]
  end

  def serialize(object)
    HouseholdSerializer.new(
      object,
      { include: include, meta: { page: page, per: per } }
    ).serialized_json
  end
end
