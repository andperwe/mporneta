class AddZmagRatySum < ActiveRecord::Migration
  def change
    add_column :raty_sums, :zmag_dw, :boolean, :default => 0 
  end
end
