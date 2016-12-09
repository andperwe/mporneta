class ChangePojazdsMarkMod < ActiveRecord::Migration
  def change
      rename_column :pojazds, :idmarki, :marki_poj_id
      rename_column :pojazds, :idmodelu, :model_poj_id
  end
end
