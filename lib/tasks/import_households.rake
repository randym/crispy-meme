require "smarter_csv"
require "set"

namespace :import do
  # Import households and cities from CSV
  # We normalize the city 1 -> * household relationship

  # NOTES:
  # - Skipping validations
  # - This should be run on a non-user-facing instance
  # - anticipated future data requiremments unknown. Consider
  #   bulk upsering to minimize rails<->db at the cost
  #   of more memory usage

  desc "Import households and cities from CSV"
  task households: :environment do
    file_path = ENV["FILE_PATH"] || "source_data/house_data.csv"
    cities = Set.new
    puts "Importing households in #{Rails.env} environment."
    options = {
      chunk_size: 100,
      required_keys: %i[id firstname lastname city num_of_people has_child]
    }

    count = 0
    SmarterCSV.process(file_path, options) do |chunk|
      chunk.each do |row|
        city_name = row[:city]
        city = City.find_or_create_by(name: city_name)
        ref = row[:id]

        household = Household.find_or_initialize_by(ref: ref)
        household.update(
          ref: ref,
          first_name: row[:firstname],
          last_name: row[:lastname],
          city: city,
          resident_count: row[:num_of_people],
          has_children: row[:has_child] == "Yes"
        )

        if household.save
          cities << city_name
          count += 1
        else
          puts "Error: #{household.errors.full_messages.join(", ")}"
        end
      end
    end

    puts "Proccessed #{count} records"
  end
end
