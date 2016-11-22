class CreateOsobas < ActiveRecord::Migration
  def change
    create_table :osobas do |t|
      t.string :nazwisko, limit: 100
      t.string :imie, limit: 30
      t.string :kod, limit: 6
      t.string :miejscowosc, limit: 30
      t.string :ulica, limit: 40
      t.string :kod_k, limit: 6
      t.string :miejscowosc_k, limit: 30
      t.string :ulica_k, limit: 40
      t.string :tel, limit: 20
      t.string :tel_kom, limit: 20
      t.string :email, limit: 30
      t.string :pesel, limit: 11
      t.integer :id_praw
      t.integer :rok_ur, limit: 4
      t.string :Kat, limit: 1
      t.datetime :Data_ur
      t.date :data_wyd
      t.text :uwagi
      t.string :nip, limit: 15
      t.string :regon, limit: 15
      t.integer :typ_prawny
      t.string :n_firmy, limit: 100
    end
  end
end
