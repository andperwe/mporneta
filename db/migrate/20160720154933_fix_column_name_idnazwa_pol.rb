class FixColumnNameIdnazwaPol < ActiveRecord::Migration
  def change
    rename_column :polisas, :idnazwa_pol, :rodz_pol_id
  end
end
