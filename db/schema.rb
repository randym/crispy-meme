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

ActiveRecord::Schema[7.2].define(version: 2024_11_16_125143) do
  create_table "cities", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "energy_pricing_groups", force: :cascade do |t|
    t.integer "energy_pricing_plan_id", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["energy_pricing_plan_id", "name"], name: "index_energy_pricing_groups_on_plan_and_name", unique: true
    t.index ["energy_pricing_plan_id"], name: "index_energy_pricing_groups_on_energy_pricing_plan_id"
  end

  create_table "energy_pricing_plans", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_energy_pricing_plans_on_name", unique: true
  end

  create_table "energy_pricing_tiers", force: :cascade do |t|
    t.integer "energy_pricing_group_id", null: false
    t.float "min", null: false
    t.float "max", null: false
    t.float "rate", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["energy_pricing_group_id", "min", "max"], name: "index_energy_pricing_tiers_on_group_and_min_max", unique: true
    t.index ["energy_pricing_group_id"], name: "index_energy_pricing_tiers_on_energy_pricing_group_id"
    t.check_constraint "max >= 0", name: "check_min_positive"
    t.check_constraint "min < max", name: "check_min_less_than_max"
    t.check_constraint "min >= 0", name: "check_min_positive"
    t.check_constraint "rate >= 0", name: "check_rate_positive"
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

  create_table "time_of_uses", force: :cascade do |t|
    t.integer "energy_pricing_group_id", null: false
    t.integer "hour", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["energy_pricing_group_id", "hour"], name: "index_time_of_uses_on_energy_pricing_group_and_hour", unique: true
    t.index ["energy_pricing_group_id"], name: "index_time_of_uses_on_energy_pricing_group_id"
    t.check_constraint "hour >= 0 AND hour <= 23"
  end

  add_foreign_key "energy_pricing_groups", "energy_pricing_plans", on_delete: :cascade
  add_foreign_key "energy_pricing_tiers", "energy_pricing_groups", on_delete: :cascade
  add_foreign_key "energy_productions", "households", column: "household_ref", primary_key: "ref"
  add_foreign_key "households", "cities"
  add_foreign_key "time_of_uses", "energy_pricing_groups", on_delete: :cascade
end
