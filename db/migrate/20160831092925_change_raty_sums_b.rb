class ChangeRatySumsB < ActiveRecord::Migration
  def change
    change_column :raty_sums, :zapl, :boolean, :default => 0
    change_column :raty_sums, :prow_dowolna, :boolean, :default => 0
    change_column :raty_sums, :rozliczona, :boolean, :default => 0
    change_column :raty_sums, :roz_owca, :boolean, :default => 0
    change_column :raty_sums, :przypominac, :boolean, :default => 0
  end
end
