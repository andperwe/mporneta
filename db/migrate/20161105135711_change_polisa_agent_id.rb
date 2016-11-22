class ChangePolisaAgentId < ActiveRecord::Migration
  def change
    rename_column :polisas, :agent_id, :agencje_id
  end
end
