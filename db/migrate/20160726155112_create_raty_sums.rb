class CreateRatySums < ActiveRecord::Migration
  def change
    create_table :raty_sums do |t|
      t.integer :polisa_id
      t.decimal :kwota, :precision => 9, :scale => 2
      t.date :data
      t.integer :zapl, limit: 1
      t.integer :rodzaj_platnosci_id
      t.string :nr_dw, limit: 20
      t.integer :nr_raty
      t.integer :nazwy_polisies_id
      t.decimal :prow_proc, :precision => 9, :scale => 2
      t.decimal :prow_kwota, :precision => 9, :scale => 2
      t.decimal :prow_ag_proc, :precision => 9, :scale => 2
      t.decimal :prow_ag_kwota, :precision => 9, :scale => 2
      t.decimal :prow_otrzymana, :precision => 9, :scale => 2
      t.string :uwagi, limit: 50
      t.date :data_w
      t.integer :prow_dowolna, limit: 1
      t.decimal :odsetki, :precision => 9, :scale => 2
      t.integer :id_agent
      t.integer :rozliczona, limit: 1
      t.integer :roz_owca, limit: 1
      t.string :nr_wyk, limit: 15
      t.date :data_roz
      t.decimal :kwota_owca, :precision => 9, :scale => 2
      t.string :kom, limit: 30
      t.integer :przypominac, limit: 1
      t.integer :typ_platnosci_id

    end
  end
end
