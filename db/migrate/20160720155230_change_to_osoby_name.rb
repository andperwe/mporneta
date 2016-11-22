class ChangeToOsobyName < ActiveRecord::Migration
  def change
    rename_column :polisas, :osoby_id, :osoba_id
  end
end
