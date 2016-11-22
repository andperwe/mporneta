class ChangePojazd < ActiveRecord::Migration
  def change
    rename_column :pojazds, :idrodzaju, :rodzaj_poj_id
  end
end
