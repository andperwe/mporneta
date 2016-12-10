class CreateNazwaDrs < ActiveRecord::Migration
  def change
    create_table :nazwa_drs do |t|
      t.string :nazwa, limit: 30
    end
  end
end
