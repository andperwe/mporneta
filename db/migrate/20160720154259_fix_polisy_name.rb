class FixPolisyName < ActiveRecord::Migration
  def change
    rename_column :polisas, :id_osoby, :osoby_id
    rename_column :polisas, :idtu, :towarzystwo_id
  end
end
