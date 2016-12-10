class CreateStans < ActiveRecord::Migration
  def change
    create_table :stans do |t|
      t.string :stan, limit: 30
    end
  end
end
