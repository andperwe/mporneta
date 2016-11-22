class CreateTowarzystwos < ActiveRecord::Migration
  def change
    create_table :towarzystwos do |t|
      t.string :nazwa, limit: 30
      t.string :ulica, limit: 40
      t.string :kod, limit: 6
      t.string :miasto, limit: 40
      t.string :bank, limit: 50
      t.string :oddzial, limit: 50
      t.string :nr_konta, limit: 50
      t.string :nazwa_max, limit: 100
      t.string :email1, limit: 100
      t.string :email2, limit: 100
      t.string :tel, limit: 100
      t.string :fax, limit: 100
      t.string :tel_ass, limit: 100
      t.string :tel_szk, limit: 100
    end
  end
end
