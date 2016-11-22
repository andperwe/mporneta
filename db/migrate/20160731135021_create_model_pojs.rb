class CreateModelPojs < ActiveRecord::Migration
  def change
    create_table :model_pojs do |t|
      t.integer :idmarka
      t.string :model, limit: 40
      t.integer :idrodzaju
      t.string :typ, limit: 40
      t.string :pojemnosc, limit: 40
      t.string :ladownosc, limit: 40
      t.integer :ilosc_miejsc, limit: 2

      
    end
  end
end
