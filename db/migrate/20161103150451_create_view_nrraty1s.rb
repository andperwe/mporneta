class CreateViewNrraty1s < ActiveRecord::Migration
  def up
      self.connection.execute %Q( CREATE OR REPLACE VIEW view_nrraty1s AS
      SELECT
  `raty_sums`.`polisa_id` AS `polisa_id`,
  SUM(`raty_sums`.`kwota`) AS `kwota`
FROM
  `raty_sums`
WHERE
  (`raty_sums`.`nr_raty` = 1)
GROUP BY `raty_sums`.`polisa_id`
          )
    end

    def down
      self.connection.execute "DROP VIEW IF EXISTS view_nrraty1s;"
    end
end
