class CreateOddzials < ActiveRecord::Migration
  def change
    create_table :oddzials do |t|
       t.string :miasto, limit: 100
       t.integer :agencje_id
    end
  end
end
