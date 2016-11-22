class CreateFunkcjes < ActiveRecord::Migration
  def change
    create_table :funkcjes do |t|
      t.string :nazwa_funkcji, limit: 50
    end
  end
end
