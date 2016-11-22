class AddFieldsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :nazwa, :string, limit: 100
    add_column :users, :funkcje_id, :integer
    add_column :users, :agencje_id, :integer
    add_column :users, :login, :string, limit: 100
  end
end
