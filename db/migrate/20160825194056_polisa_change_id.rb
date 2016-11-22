class PolisaChangeId < ActiveRecord::Migration
  def change
    rename_column :polisas, :userid, :user_id
    rename_column :polisas, :idagent, :agent_id
  end
end
