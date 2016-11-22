class CreateTypPlatnoscis < ActiveRecord::Migration
  def change
    create_table :typ_platnoscis do |t|
      t.string :nazwa_typu, limit: 20

    end
  end
end
