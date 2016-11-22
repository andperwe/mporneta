class CreateViewPrzypis < ActiveRecord::Migration
  def up
      self.connection.execute %Q( CREATE OR REPLACE VIEW view_przypis AS
      SELECT
        `raty_sums`.`polisa_id` AS `polisa_id`,
        SUM(`raty_sums`.`kwota`) AS `k`
    FROM
        `raty_sums`
    GROUP BY `raty_sums`.`polisa_id`
          )
    end

    def down
      self.connection.execute "DROP VIEW IF EXISTS view_przypis;"
    end
end
