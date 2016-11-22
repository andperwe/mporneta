class CreateRodzajPlatnoscis < ActiveRecord::Migration
  def change
    create_table :rodzaj_platnoscis do |t|
      t.string :typ, limit: 10

    end
  end
end
