module Paginatable
  def page
    params[:page] || 1
  end

  def per
    params[:per] || 5
  end
end
