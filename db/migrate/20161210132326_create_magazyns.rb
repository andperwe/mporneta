class CreateMagazyns < ActiveRecord::Migration
  def change
    create_table :magazyns do |t|
       t.string :numer, limit: 30
       t.integer :towarzystwo_id
       t.integer :nazwa_dr_id
       t.integer :stan_id
       t.date :data_wpl
       t.date :data_zda
       t.integer :user_id
       t.date :data_zmiany

      t.timestamps null: false
    end
  end
end
