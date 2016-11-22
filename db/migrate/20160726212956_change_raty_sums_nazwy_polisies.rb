class ChangeRatySumsNazwyPolisies < ActiveRecord::Migration
  def change
    rename_column :raty_sums, :nazwy_polisies_id, :nazwy_pol_id
  end
end
