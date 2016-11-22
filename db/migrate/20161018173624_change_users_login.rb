class ChangeUsersLogin < ActiveRecord::Migration
  def change
    rename_column :users, :login, :loginn
  end
end
