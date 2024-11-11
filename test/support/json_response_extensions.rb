module JSONResponseExtensions
  def json
    @json ||= JSON.parse(body)
  end
end
