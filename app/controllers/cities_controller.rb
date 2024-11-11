class CitiesController < ApplicationController
  include Paginatable

  def index
    render json: serialize(cities)
  end

  def show
    render json: serialize(city)
  end

  private

  def cities
    City.page(page).per(per)
  end

  def city
    City.find(params[:id])
  end

  def serialize(object)
    CitySerializer.new(
      object,
      {
        include: %i[households energy_productions],
        meta: {
          page: page,
          per: per
        }
      }
    ).serialized_json
  end
end
