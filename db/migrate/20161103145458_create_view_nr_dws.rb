class CreateViewNrDws < ActiveRecord::Migration
  def up
      self.connection.execute %Q( CREATE OR REPLACE VIEW view_nr_dws AS
      SELECT
        MIN(`raty_sums`.`polisa_id`) AS `polisa_id`,
        `raty_sums`.`nr_dw` AS `nr_dw`
    FROM
        `raty_sums`
    WHERE
        ((TRIM(COALESCE(`raty_sums`.`nr_dw`, '')) <> '')
            AND (`raty_sums`.`nr_raty` = 1))
    GROUP BY `raty_sums`.`nr_dw`
          )
    end

    def down
      self.connection.execute "DROP VIEW IF EXISTS view_nr_dws;"
    end
end
