class CreateRodzajPojs < ActiveRecord::Migration
  def change
    create_table :rodzaj_pojs do |t|
      t.string :rodzaj, limit: 50
    end
  end
end
