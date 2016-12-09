class ChangePojazdsPalNadw < ActiveRecord::Migration
  def change
    rename_column :pojazds, :idpaliwa, :paliwo_id
    rename_column :pojazds, :idnadwozia, :nadwozie_id
  end
end
