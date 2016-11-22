class CreateViewOsobas < ActiveRecord::Migration
  def up
      self.connection.execute %Q( CREATE OR REPLACE VIEW view_osobas AS
          SELECT
            id,
            CONCAT_WS(' ',
              IF(LENGTH(`n_firmy`),`n_firmy`,NULL),
              IF(LENGTH(`nazwisko`),`nazwisko`,NULL),
              IF(LENGTH(`imie`),`imie`,NULL)
            ) as ubezpieczony,
            miejscowosc,
            ulica,
            tel,
            pesel,
            uwagi
            FROM osobas
          )
    end

    def down
      self.connection.execute "DROP VIEW IF EXISTS view_osobas;"
    end
end
