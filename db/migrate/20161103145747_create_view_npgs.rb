class CreateViewNpgs < ActiveRecord::Migration
  def up
    self.connection.execute %Q( CREATE OR REPLACE VIEW view_nazwy_ryzyks AS
    SELECT
       `ryz_pols`.`polisa_id` AS `polisa_id`,
        `nazwy_pols`.`nazwa_polisy` AS `nazwa_polisy`
    FROM
     (`ryz_pols`
       JOIN `nazwy_pols`)
    WHERE
      (`ryz_pols`.`nazwy_pol_id` = `nazwy_pols`.`id`)
        )

      self.connection.execute %Q( CREATE OR REPLACE VIEW view_npgs AS
      SELECT
        `view_nazwy_ryzyks`.`polisa_id` AS `polisa_id`,
        GROUP_CONCAT(`view_nazwy_ryzyks`.`nazwa_polisy`
            SEPARATOR ', ') AS `np`
    FROM
        `view_nazwy_ryzyks`
    GROUP BY `view_nazwy_ryzyks`.`polisa_id`
          )
    end

    def down
      self.connection.execute "DROP VIEW IF EXISTS view_nazwy_ryzyks;"
      self.connection.execute "DROP VIEW IF EXISTS view_npgs;"
    end
end
