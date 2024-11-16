class CreateEnergyPricingGroups < ActiveRecord::Migration[7.2]
  def change
    create_table :energy_pricing_groups do |t|
      t.references :energy_pricing_plan,
                   null: false,
                   foreign_key: {
                     on_delete: :cascade
                   }
      t.string :name, null: false

      t.timestamps
    end

    add_index :energy_pricing_groups,
              %i[energy_pricing_plan_id name],
              unique: true,
              name: "index_energy_pricing_groups_on_plan_and_name"
  end
end
