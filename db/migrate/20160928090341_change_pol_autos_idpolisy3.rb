class ChangePolAutosIdpolisy3 < ActiveRecord::Migration
  def change
    rename_column :pol_autos, :idpolisa, :polisa_id
  end
end
