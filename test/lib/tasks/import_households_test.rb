require "test_helper"
require "rake"

class ImportHouseholdsTest < ActiveSupport::TestCase
  setup do
    Rake.application.rake_require "tasks/import_households"
    Rake::Task.define_task(:environment)

    @ref = households.last.ref # avoid fixture conflicts

    HEADER = "ID,Firstname,Lastname,City,num_of_people,has_child"
    @ROWS = %w[Carolyn,Flores,London,2,Yes Jennifer,Martinez,Cambridge,3,No]

    CSV_DATA = [HEADER, *@ROWS.map { |row| "#{@ref += 1},#{row}" }]
    file_path = "test/fixtures/files/import_data/households.csv"
    File.write(file_path, CSV_DATA.join("\n"))

    ENV["FILE_PATH"] = file_path.to_s
  end

  test "should import households" do
    assert_difference "Household.count", 2 do
      Rake::Task["import:households"].invoke
    end

    @ref = @ref - 1
    @ROWS.each_with_index do |row, index|
      household = Household.find_by_ref(@ref + index)
      first_name, last_name, city_name, resident_count, has_children =
        row.split(",")

      assert_equal first_name, household.first_name
      assert_equal last_name, household.last_name
      assert_equal city_name, household.city.name
      assert_equal resident_count.to_i, household.resident_count
      assert_equal has_children == "Yes", household.has_children
    end
  end
end
