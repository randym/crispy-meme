module Serializations
  class << self
    def method_missing(method, *args, &block)
      whitelisted.include?(method) && instance_variable_get("@#{method}") ||
        instance_variable_set("@#{method}", load(method.to_s))
    end

    private

    def whitelisted
      @whitelisted ||=
        Dir.entries(source).map { |file| File.basename(file, ".json").to_sym }
    end

    def source
      @source ||= Rails.root.join("test", "fixtures", "files", "serializations")
    end

    def load(resource)
      JSON.parse(File.read(File.join(source, "#{resource}.json")))
    end
  end
end
