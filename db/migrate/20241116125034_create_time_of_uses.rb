class CreateTimeOfUses < ActiveRecord::Migration[7.2]
  def change
    create_table :time_of_uses do |t|
      t.references :energy_pricing_group,
                   null: false,
                   foreign_key: {
                     on_delete: :cascade
                   }
      t.integer :hour, null: false

      t.timestamps
    end

    add_check_constraint :time_of_uses, "hour >= 0 AND hour <= 23"
    add_index :time_of_uses,
              %i[energy_pricing_group_id hour],
              unique: true,
              name: "index_time_of_uses_on_energy_pricing_group_and_hour"
  end
end
