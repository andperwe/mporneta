class CreatePolAutos < ActiveRecord::Migration
  def change
    create_table :pol_autos do |t|
      t.integer :id_auto
      t.integer :id_polisa
      t.string :nr_rej, limit: 15
      t.decimal :suma_ubezpieczenia, :precision => 9, :scale => 2
      t.decimal :skladka, :precision => 9, :scale => 2
    end
  end
end
