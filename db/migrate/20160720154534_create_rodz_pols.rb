class CreateRodzPols < ActiveRecord::Migration
  def change
    create_table :rodz_pols do |t|
      t.string :nazwa_rodz, limit: 50
      t.integer :idtu
      t.integer :typ
    end
  end
end
