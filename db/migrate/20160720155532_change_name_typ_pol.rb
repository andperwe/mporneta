class ChangeNameTypPol < ActiveRecord::Migration
  def change
    rename_column :polisas, :idtypu, :typ_pol_id
  end
end
