class CreateEnergyProductions < ActiveRecord::Migration[7.2]
  def change
    create_table :energy_productions do |t|
      t.integer :ref
      t.integer :label
      t.integer :household_ref
      t.date :production_month
      t.float :temperature
      t.float :daylight
      t.integer :kwh

      t.timestamps
    end

    add_index :energy_productions, :ref, unique: true
    add_index :energy_productions, [ :household_ref, :production_month ], unique: true

    add_foreign_key :energy_productions, :households, column: :household_ref, primary_key: :ref
  end
end
