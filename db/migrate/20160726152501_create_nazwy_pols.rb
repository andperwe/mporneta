class CreateNazwyPols < ActiveRecord::Migration
  def change
    create_table :nazwy_pols do |t|
      t.string :nazwa_polisy, limit: 100
      t.integer :rodz_pol_id
      t.integer :typ

    end
  end
end
