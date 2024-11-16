require "json"
namespace :create do
  desc "Creates energy pricing plans"
  task energy_pricing_plans: :environment do
    file_path =
      ENV["PLANS_FILE_PATH"] ||
        File.join(Rails.root, "source_data", "energy_pricing_plans.json")
    source = JSON.parse(File.read(file_path))

    source.each do |plan_data|
      plan_data.deep_symbolize_keys!
      next if EnergyPricingPlan.exists?(name: plan_data[:name])
      Hydrators::EnergyPlan.hydrate(plan_data)
    end
  end
end
