class CreateViewVmag2s < ActiveRecord::Migration
  def up
 self.connection.execute %Q( CREATE OR REPLACE VIEW view_vmag2s AS
 SELECT
      `view_vmags`.`id_n` AS `id_n`,
      `magazyns`.`numer` AS `numer`,
      `magazyns`.`towarzystwo_id` AS `towarzystwo_id`,
      `towarzystwos`.`nazwa` AS `nazwa`,
      `magazyns`.`nazwa_dr_id` AS `nazwa_dr_id`,
      `nazwa_drs`.`nazwa` AS `dokument`,
      `magazyns`.`stan_id` AS `stan_id`,
      `stans`.`stan` AS `stan`,
      `magazyns`.`user_id` AS `user_id`,
      `users`.`nazwa` AS `uzytkownik`,
      `magazyns`.`data_wpl` AS `data_wpl`,
      `magazyns`.`data_zda` AS `data_zda`
  FROM
      (((((`view_vmags`
      JOIN `magazyns`)
      JOIN `towarzystwos`)
      JOIN `nazwa_drs`)
      JOIN `stans`)
      JOIN `users`)
  WHERE
      ((`view_vmags`.`id_n` = `magazyns`.`id`)
          AND (`towarzystwos`.`id` = `magazyns`.`towarzystwo_id`)
          AND (`nazwa_drs`.`id` = `magazyns`.`nazwa_dr_id`)
          AND (`stans`.`id` = `magazyns`.`stan_id`)
          AND (`users`.`id` = `magazyns`.`user_id`))

  )
end

def down
 self.connection.execute "DROP VIEW IF EXISTS view_vmag2s;"
end
end
