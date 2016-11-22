class ChangeAgencje < ActiveRecord::Migration
  def change
    add_index :agencjes, :nazwa_s, :unique => true
  end
end
