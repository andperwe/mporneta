class ModelPojsChange < ActiveRecord::Migration
  def change
    rename_column :model_pojs, :idmarka, :marki_poj_id
  end
end
