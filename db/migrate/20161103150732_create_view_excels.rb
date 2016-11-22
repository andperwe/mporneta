class CreateViewExcels < ActiveRecord::Migration
  def up
      self.connection.execute %Q( CREATE OR REPLACE VIEW view_excels AS
      select polisas.id,polisas.numer,polisas.ubezpieczony,nazwa,polisas.certyfikat,polisas.zk,
polisas.data_wystawienia,polisas.pl,np,k,kwota,nr_dw,polisas.typ_platnosci_id
from towarzystwos,
polisas left join view_npgs on polisas.id = view_npgs.polisa_id
left join view_przypis on polisas.id = view_przypis.polisa_id
left join view_nrraty1s on polisas.id = view_nrraty1s.polisa_id
left join view_nr_dws on polisas.id = view_nr_dws.polisa_id
where
polisas.towarzystwo_id = towarzystwos.id
order by nazwa;
          )
    end

    def down
      self.connection.execute "DROP VIEW IF EXISTS view_excels;"
    end
end
