class ChangePolAutosIdpolisy < ActiveRecord::Migration
  def change
      rename_column :pol_autos, :idpojazd, :pojazd_id
  end
end
