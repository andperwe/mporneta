class AddPolisaOddzial < ActiveRecord::Migration
  def change
      add_column :polisas, :oddzial_id, :integer
  end
end
