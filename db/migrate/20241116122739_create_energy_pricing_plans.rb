class CreateEnergyPricingPlans < ActiveRecord::Migration[7.2]
  def change
    create_table :energy_pricing_plans do |t|
      t.string :name

      t.timestamps
    end

    add_index :energy_pricing_plans, :name, unique: true
  end
end
