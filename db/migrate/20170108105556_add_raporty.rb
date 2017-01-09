class AddRaporty < ActiveRecord::Migration
  def change
    add_column :raporties, :L17, :string
    add_column :raporties, :L18, :string 
  end
end
