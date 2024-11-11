require "smarter_csv"
require "set"

namespace :import do
  # NOTES:
  # - Skipping validations
  # - This should be run on a non-user-facing instance
  # - anticipated future data requiremments unknown. Consider
  #   bulk upsering to minimize rails<->db at the cost
  #   of more memory usage

  desc "Import energy prodction data CSV"
  task energy_productions: :environment do
    file_path = ENV["FILE_PATH"] || "source_data/house_data.csv"
    options = {
      chunk_size: 100,
      required_keys: %i[
        id
        label
        house
        year
        month
        temperature
        daylight
        energyproduction
      ]
    }

    puts "Importing enerty productions in #{Rails.env} environment."
    count = 0
    SmarterCSV.process(file_path, options) do |chunk|
      chunk.each do |row|
        ref = row[:id]
        year = row[:year]
        month = row[:month]
        production_date = Date.parse("#{year}-#{month}-01")
        household = Household.find_by(ref: row[:house])
        record = EnergyProduction.find_or_initialize_by(ref: ref)

        record.update(
          label: row[:label],
          household: household,
          production_month: production_date,
          temperature: row[:temperature],
          daylight: row[:daylight],
          kwh: row[:energyproduction]
        )

        if record.save
          count += 1
        else
          puts "Error: #{record.errors.full_messages.join(", ")}"
        end
      end
    end

    puts "Proccessed #{count} records"
  end
end
