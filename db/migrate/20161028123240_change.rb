class Change < ActiveRecord::Migration
  def change
    change_column_null :rodzaj_pojs, :rodzaj, false
    change_column_null :model_pojs, :model, false
    change_column_null :marki_pojs, :marka, false
    add_index :marki_pojs, :marka, :unique => true
  end
end
