class CreateViewVmag3s < ActiveRecord::Migration
  def up
   self.connection.execute %Q( CREATE OR REPLACE VIEW view_vmag3s AS
   SELECT
        `magazyns`.`id` AS `id`,
        `magazyns`.`numer` AS `numer`,
        `magazyns`.`towarzystwo_id` AS `towarzystwo_id`,
        `towarzystwos`.`nazwa` AS `nazwa`,
        `magazyns`.`nazwa_dr_id` AS `nazwa_dr_id`,
        `nazwa_drs`.`nazwa` AS `dokument`,
        `magazyns`.`stan_id`,
        `stans`.`stan` AS `stan`,
        `magazyns`.`user_id`,
        `users`.`nazwa` AS `user`,
        `magazyns`.`data_wpl` AS `data_wpl`,
        `magazyns`.`data_zda` AS `data_zda`
    FROM
        ((((`magazyns`
        JOIN `towarzystwos`)
        JOIN `nazwa_drs`)
        JOIN `stans`)
        JOIN `users`)
    WHERE
        ((`towarzystwos`.`id` = `magazyns`.`towarzystwo_id`)
            AND (`nazwa_drs`.`id` = `magazyns`.`nazwa_dr_id`)
            AND (`stans`.`id` = `magazyns`.`stan_id`)
            AND (`users`.`id` = `magazyns`.`user_id`))
    ORDER BY `magazyns`.`data_zmiany` DESC

    )
 end

 def down
   self.connection.execute "DROP VIEW IF EXISTS view_vmag3s;"
 end
end
