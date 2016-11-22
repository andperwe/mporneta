class RemoveColumnsPojazds < ActiveRecord::Migration
  def change
     remove_column :pojazds, :idpolisy
  end
end
