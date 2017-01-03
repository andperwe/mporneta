class CreateViewVmags < ActiveRecord::Migration
  def up
     self.connection.execute %Q( CREATE OR REPLACE VIEW view_vmags AS
     SELECT
           MAX(`magazyns`.`id`) AS `id_n`,
           `magazyns`.`towarzystwo_id` AS `towarzystwo_id`,
           `magazyns`.`numer` AS `numer`,
           `magazyns`.`nazwa_dr_id` AS `nazwa_dr_id`
       FROM
           `magazyns`
       GROUP BY `magazyns`.`numer` , `magazyns`.`nazwa_dr_id` , `magazyns`.`towarzystwo_id`
       ORDER BY `magazyns`.`id` DESC;
      )
   end

   def down
     self.connection.execute "DROP VIEW IF EXISTS view_vmags;"
   end
end
