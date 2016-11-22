class CreateTypPols < ActiveRecord::Migration
  def change
    create_table :typ_pols do |t|
      t.string :nazwa_typu, limit: 20

    end
  end
end
