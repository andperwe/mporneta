class ChangePolAutos < ActiveRecord::Migration
  def change
    rename_column :pol_autos, :id_auto, :pojazd_id
    rename_column :pol_autos, :id_polisa, :polisa_id
  end
end
