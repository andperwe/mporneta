class AddColumnMagazyn < ActiveRecord::Migration
  def change
    add_column :magazyns, :idpol, :integer
  end
end
