class PolautoZmiana < ActiveRecord::Migration
  def change
    rename_column :pol_autos, :pojazd_id, :idpojazd
    rename_column :pol_autos, :polisa_id, :idpolisa

  end
end
