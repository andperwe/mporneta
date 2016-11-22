class ChangePolAutosNrRej < ActiveRecord::Migration
  def change
    rename_column :pol_autos, :nr_rej, :nr_reja
  end
end
