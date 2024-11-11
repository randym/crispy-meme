# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2024_10_24_112230) do
  create_table "cities", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "energy_productions", force: :cascade do |t|
    t.integer "ref"
    t.integer "label"
    t.integer "household_ref"
    t.date "production_month"
    t.float "temperature"
    t.float "daylight"
    t.integer "kwh"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["household_ref", "production_month"], name: "index_energy_productions_on_household_ref_and_production_month", unique: true
    t.index ["ref"], name: "index_energy_productions_on_ref", unique: true
  end

  create_table "households", force: :cascade do |t|
    t.integer "ref"
    t.string "first_name"
    t.string "last_name"
    t.integer "city_id", null: false
    t.integer "resident_count"
    t.boolean "has_children"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["city_id"], name: "index_households_on_city_id"
    t.index ["ref"], name: "index_households_on_ref", unique: true
  end

  add_foreign_key "energy_productions", "households", column: "household_ref", primary_key: "ref"
  add_foreign_key "households", "cities"
end
