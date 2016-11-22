class CreateWspolwlas < ActiveRecord::Migration
  def change
    create_table :wspolwlas do |t|
      t.integer :idpolisy
      t.string :nazwisko, limit: 30
      t.string :imie, limit: 30
      t.string :kod, limit: 6
      t.string :miejscowosc, limit: 30
      t.string :ulica, limit: 50
      t.string :pesel, limit: 14
      t.date :data_praw
      t.integer :kat
      t.text :uwagi

    end
  end
end
