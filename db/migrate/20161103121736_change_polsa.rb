class ChangePolsa < ActiveRecord::Migration
  def change
      add_column :polisas, :typ_platnosci_id, :integer
  end
end
