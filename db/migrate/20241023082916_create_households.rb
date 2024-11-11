class CreateHouseholds < ActiveRecord::Migration[7.2]
  def change
    create_table :households do |t|
      t.integer :ref
      t.string :first_name
      t.string :last_name
      t.references :city, null: false, foreign_key: true
      t.integer :resident_count
      t.boolean :has_children

      t.timestamps
    end
  end
end
