class CreateNadwozies < ActiveRecord::Migration
  def change
    create_table :nadwozies do |t|
      t.string :typ_nadw, limit: 40

    end
  end
end
