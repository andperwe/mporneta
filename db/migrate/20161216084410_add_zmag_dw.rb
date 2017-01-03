class AddZmagDw < ActiveRecord::Migration
  def change
    add_column :polisas, :zmag_dw, :boolean, :default => 0 
  end
end
