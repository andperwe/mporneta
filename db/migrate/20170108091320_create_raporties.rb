class CreateRaporties < ActiveRecord::Migration
  def change
    create_table :raporties do |t|
      t.string :L1
      t.string :L2
      t.string :L3
      t.string :L4
      t.string :L5
      t.string :L6
      t.string :L7
      t.string :L8
      t.string :L9
      t.string :L10
      t.string :L11
      t.string :L12
      t.string :L13
      t.string :L14
      t.string :L15
      t.string :L16
      t.string :email
      t.timestamps null: false
    end
  end
end
