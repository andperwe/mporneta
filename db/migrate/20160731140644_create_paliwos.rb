class CreatePaliwos < ActiveRecord::Migration
  def change
    create_table :paliwos do |t|
      t.string :rodzaj_paliwa, limit: 40
    end
  end
end
