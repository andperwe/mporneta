class CreatePolisas < ActiveRecord::Migration
  def change
    create_table :polisas do |t|
      t.integer :idtu
      t.integer :idnazwa_pol
      t.string :numer, limit: 50
      t.integer :idtypu
      t.string :ozn, limit: 50
      t.string :nr_wniosku, limit: 50
      t.date :data_wnios
      t.string :ubezpieczony, limit: 100
      t.date :pocz_okresu_ubezp
      t.date :koniec_okresu_ubezp
      t.date :data_wystawienia
      t.date :data_wprowadzenia
      t.date :data_wznowienia
      t.integer :polisa_zwrocona_po_sprzed, limit: 1
      t.date :data_zwrotu_polisy
      t.integer :polisa_nie_podlega_wzn, limit: 1
      t.integer :wystapila_szkoda, limit: 1
      t.integer :zn, limit: 3
      t.integer :zw, limit: 3
      t.string :kod_typu_klienta, limit: 50
      t.string :kod_rodzaju_polisy, limit: 50
      t.text :uwagi_dodatkowe
      t.integer :id_osoby
      t.string :certyfikat, limit: 50
      t.string :pl, limit: 50
      t.string :zk, limit: 50
      t.string :miejsce_ub, limit: 50
      t.integer :przypominac, limit: 1
      t.integer :userid
      t.integer :zmag_n, limit: 1
      t.integer :zmag_c, limit: 1
      t.integer :zmag_zk, limit: 1
      t.integer :zmag_ktk, limit: 1
      t.integer :idagent
      t.string :wprowadzil, limit: 60
      t.integer :rodzaj_polisy

    end
  end
end
