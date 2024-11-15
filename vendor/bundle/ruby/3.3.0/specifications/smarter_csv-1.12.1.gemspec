# -*- encoding: utf-8 -*-
# stub: smarter_csv 1.12.1 ruby lib ext
# stub: ext/smarter_csv/extconf.rb

Gem::Specification.new do |s|
  s.name = "smarter_csv".freeze
  s.version = "1.12.1".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "changelog_uri" => "https://github.com/tilo/smarter_csv/blob/main/CHANGELOG.md", "homepage_uri" => "https://github.com/tilo/smarter_csv", "source_code_uri" => "https://github.com/tilo/smarter_csv" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze, "ext".freeze]
  s.authors = ["Tilo Sloboda".freeze]
  s.date = "2024-07-10"
  s.description = "Ruby Gem for convenient reading and writing of CSV files. It has intelligent defaults, and auto-discovery of column and row separators. It imports CSV Files as Array(s) of Hashes, suitable for direct processing with ActiveRecord, kicking-off batch jobs with Sidekiq, parallel processing, or oploading data to S3. Similarly, writing CSV files takes Hashes, or Arrays of Hashes to create a CSV file.".freeze
  s.email = ["tilo.sloboda@gmail.com".freeze]
  s.extensions = ["ext/smarter_csv/extconf.rb".freeze]
  s.files = ["ext/smarter_csv/extconf.rb".freeze]
  s.homepage = "https://github.com/tilo/smarter_csv".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.5.0".freeze)
  s.rubygems_version = "3.2.3".freeze
  s.summary = "Convenient CSV Reading and Writing".freeze

  s.installed_by_version = "3.5.22".freeze

  s.specification_version = 4

  s.add_development_dependency(%q<awesome_print>.freeze, [">= 0".freeze])
  s.add_development_dependency(%q<codecov>.freeze, [">= 0".freeze])
  s.add_development_dependency(%q<pry>.freeze, [">= 0".freeze])
  s.add_development_dependency(%q<rspec>.freeze, [">= 0".freeze])
  s.add_development_dependency(%q<rubocop>.freeze, [">= 0".freeze])
  s.add_development_dependency(%q<simplecov>.freeze, [">= 0".freeze])
end
