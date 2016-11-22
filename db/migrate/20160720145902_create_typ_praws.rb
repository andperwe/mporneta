class CreateTypPraws < ActiveRecord::Migration
  def change
    create_table :typ_praws do |t|
      t.string :rodzaj, limit: 10
    end
  end
end
