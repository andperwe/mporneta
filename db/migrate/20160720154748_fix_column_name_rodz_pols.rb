class FixColumnNameRodzPols < ActiveRecord::Migration
  def change
      rename_column :rodz_pols, :idtu, :towarzystwo_id
  end
end
