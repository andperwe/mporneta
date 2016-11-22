class CreateViewNazwyRyzyks < ActiveRecord::Migration
  def change
    rename_column :ryz_pols, :idryz, :nazwy_pol_id
    rename_column :ryz_pols, :idpol, :polisa_id
  end

  #def up
  #    self.connection.execute %Q( CREATE OR REPLACE VIEW view_nazwy_ryzyks AS
  #    SELECT
  #       `ryz_pols`.`polisa_id` AS `polisa_id`,
  #        `nazwy_pols`.`nazwa_polisy` AS `nazwa_polisy`
  #    FROM
  #     (`ryz_pols`
  #       JOIN `nazwy_pols`)
  #    WHERE
  #      (`ryz_pols`.`nazwy_pol_id` = `nazwy_pols`.`id`)
  #        )
  #  end

  #  def down
  #    self.connection.execute "DROP VIEW IF EXISTS view_nazwy_ryzyks;"
  #  end
end
