class CreatePojazds < ActiveRecord::Migration
  def change
    create_table :pojazds do |t|
      t.string :nr_rej, limit: 50
      t.integer :idmarki
      t.integer :idmodelu
      t.integer :idrodzaju
      t.string :pojemn, limit: 10
      t.integer :rok_prod, limit: 4
      t.string :nr_nadw, limit: 60
      t.integer :ilosc_miejsc, limit: 2
      t.integer :moc
      t.integer :km, limit: 1
      t.integer :kw, limit: 1
      t.date :data_badan_techn
      t.date :data_pierwszej_rej
      t.integer :przebieg
      t.text :notatka
      t.integer :diesel, limit: 1
      t.integer :gaz, limit: 1
      t.integer :idpolisy
      t.integer :idpaliwa
      t.integer :idnadwozia
      t.string :nr_dow_rej, limit: 30
      t.string :miejsce_wydania, limit: 50
      t.string :nr_silnika, limit: 60
      t.string :kolor, limit: 20
      t.string :ladownosc, limit: 10
      t.string :masa_calkowita, limit: 10
      t.date :data_rej
      t.string :karta, limit: 20
      t.text :wyp
      t.date :data_wyd_dow
      t.integer :bezterminowo, limit: 1
      t.integer :kolor_tab
      t.string :wer_wyp, limit: 30
      t.integer :trans_ile

    end
  end
end
