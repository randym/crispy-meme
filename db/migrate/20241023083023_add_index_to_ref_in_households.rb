class AddIndexToRefInHouseholds < ActiveRecord::Migration[7.2]
  def change
    add_index :households, :ref, unique: true
  end
end
