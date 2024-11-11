require "test_helper"
require "rake"

class ImportEnergyProductionsTest < ActiveSupport::TestCase
  setup do
    Rake.application.rake_require "tasks/import_energy_productions"
    Rake::Task.define_task(:environment)

    # we are relying on the fixtures to have loaded for
    # the households ref to be set correctly
    HEADER = "ID,Label,House,Year,Month,Temperature,Daylight,EnergyProduction"
    FAKE_YEAR = 2111
    ref = energy_productions.last.id + 1 # avoid fixture conflicts
    @ROWS = [
      "#{ref},0,1,#{FAKE_YEAR},7,26.2,178.9,740",
      "#{ref += 1},1,1,#{FAKE_YEAR},8,25.8,169.7,731",
      "#{ref += 1},2,1,#{FAKE_YEAR},9,22.8,170.2,694",
      "#{ref += 1},3,1,#{FAKE_YEAR},10,16.4,169.1,688"
    ]

    CSV_DATA = [HEADER, *@ROWS]
    file_path =
      Rails.root.join("test/fixtures/files/import_data/energy_productions.csv")

    File.write(file_path, CSV_DATA.join("\n"))

    ENV["FILE_PATH"] = file_path.to_s
  end

  test "should import households" do
    assert_difference "EnergyProduction.count", @ROWS.count do
      Rake::Task["import:energy_productions"].invoke
    end
  end
end
