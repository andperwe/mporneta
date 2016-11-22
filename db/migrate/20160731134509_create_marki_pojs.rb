class CreateMarkiPojs < ActiveRecord::Migration
  def change
    create_table :marki_pojs do |t|
      t.string :marka, limit: 50
    end
  end
end
