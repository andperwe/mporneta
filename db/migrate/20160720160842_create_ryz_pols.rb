class CreateRyzPols < ActiveRecord::Migration
  def change
    create_table :ryz_pols do |t|
      t.integer :idryz
      t.integer :idpol
      t.decimal :suma_ubezp, precision: 12, scale: 2
      t.decimal :stawka, precision: 8,  scale: 2
      t.text :uwagi
      t.string :waluta, limit: 4
      t.string :kod_taryfy, limit: 25
      t.decimal :przypis, precision: 8,  scale: 2
      t.integer :ilosc, limit: 4
    end
  end
end
