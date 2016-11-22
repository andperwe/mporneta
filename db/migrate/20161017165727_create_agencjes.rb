class CreateAgencjes < ActiveRecord::Migration
  def change
    create_table :agencjes do |t|
     t.string :nazwa, limit: 100
     t.string :wlasciciel, limit: 100
     t.string :tel, limit: 50
     t.string :kod, limit: 6
     t.string :miasto, limit: 50
     t.string :adres, limit: 100
     t.string :nazwa_s, limit: 50
    end
  end
end
