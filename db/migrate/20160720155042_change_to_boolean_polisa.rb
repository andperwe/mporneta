class ChangeToBooleanPolisa < ActiveRecord::Migration
  def change
    change_column :polisas, :polisa_zwrocona_po_sprzed, :boolean, :default => 0
    change_column :polisas, :polisa_nie_podlega_wzn, :boolean, :default => 0
    change_column :polisas, :wystapila_szkoda, :boolean, :default => 0
    change_column :polisas, :przypominac, :boolean, :default => 0
    change_column :polisas, :zmag_n, :boolean, :default => 0
    change_column :polisas, :zmag_c, :boolean, :default => 0
    change_column :polisas, :zmag_zk, :boolean, :default => 0
    change_column :polisas, :zmag_ktk, :boolean, :default => 0 
  end
end
