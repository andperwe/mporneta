class CreateViewRats < ActiveRecord::Migration
  def up
   self.connection.execute %Q( CREATE OR REPLACE VIEW view_rats AS
   SELECT
     `raty_sums`.`id` AS `id`,
     `raty_sums`.`polisa_id` AS `polisa_id`,
     `towarzystwos`.`nazwa` AS `nazwa`,
     `raty_sums`.`nr_dw` AS `nr_dw`,
     `raty_sums`.`nr_raty` AS `nr_raty`,
     `raty_sums`.`kwota` AS `kwota`,
     `raty_sums`.`data_w` AS `data_w`,
     `raty_sums`.`typ_platnosci_id` AS `typ_platnosci_id`,
     `raty_sums`.`zapl` AS `zapl`,
     `polisas`.`oddzial_id`,
     `polisas`.`numer`,
     `polisas`.`ubezpieczony`
 FROM
     ((`raty_sums`
     JOIN `towarzystwos`)
     JOIN `polisas`)
 WHERE
     ((`raty_sums`.`nr_raty` > 1)
         AND (`raty_sums`.`zapl` = 1)
         AND (`raty_sums`.`polisa_id` = `polisas`.`id`)
         AND (`polisas`.`towarzystwo_id` = `towarzystwos`.`id`))
 order by nazwa;
       )
 end

 def down
   self.connection.execute "DROP VIEW IF EXISTS view_rats;"
 end
end
