class CreateEnergyPricingTiers < ActiveRecord::Migration[7.2]
  def change
    create_table :energy_pricing_tiers do |t|
      t.references :energy_pricing_group,
                   null: false,
                   foreign_key: {
                     on_delete: :cascade
                   }
      t.float :min, null: false
      t.float :max, null: false
      t.float :rate, null: false

      t.timestamps
    end

    add_check_constraint :energy_pricing_tiers,
                         "min < max",
                         name: "check_min_less_than_max"

    add_check_constraint :energy_pricing_tiers,
                         "min >= 0",
                         name: "check_min_positive"

    add_check_constraint :energy_pricing_tiers,
                         "max >= 0",
                         name: "check_min_positive"

    add_check_constraint :energy_pricing_tiers,
                         "rate >= 0",
                         name: "check_rate_positive"

    add_index :energy_pricing_tiers,
              %i[energy_pricing_group_id min max],
              unique: true,
              name: "index_energy_pricing_tiers_on_group_and_min_max"
  end
end
