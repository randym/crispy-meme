#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install
npm install
bundle exec ./bin/shakapacker
bundle exec rails db:migrate

