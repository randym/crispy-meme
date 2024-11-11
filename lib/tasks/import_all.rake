namespace :import do
  desc 'Import dataset_50.csv and house_data.csv'
  task all: :environment do
    Rake::Task['import:households'].invoke
    Rake::Task['import:energy_productions'].invoke
  end
end
