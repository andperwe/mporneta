class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.integer :polisa_id
      t.string :avatar
      t.timestamps null: false
    end
  end
end
