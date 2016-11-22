class PrzypomnieniaDatatable < AjaxDatatablesRails::Base

  def sortable_columns
    # Declare strings in this format: ModelName.column_name
    @sortable_columns ||= ['Polisa.id']
  end

  def searchable_columns
    # Declare strings in this format: ModelName.column_name
    @searchable_columns ||= ['Polisa.id']
  end

  private

  def data
    records.map do |record|
      [
        # comma separated list of the values for each cell of a table row
        # example: record.attribute,
        record.id,
        record.numer,
        record.ubezpieczony,
        record.polisa_n_r,
        record.data_wznowienia,
        record.osoba_id,
        record.tel,
        record.ilosc_dni,
        record.email
      ]
    end
  end

  def get_raw_records
    # insert query here
    Polisa.select("polisas.id, numer, ubezpieczony,nazwa, nazwa_rodz, data_wznowienia, osoba_id, osobas.tel, email").joins(:towarzystwo, :rodz_pol, :osoba ).where("(TO_DAYS(data_wznowienia) - TO_DAYS(NOW())) > 0 AND (TO_DAYS(data_wznowienia) - TO_DAYS(NOW())) < 31 AND przypominac = 0 AND polisa_zwrocona_po_sprzed = 0 AND polisa_nie_podlega_wzn = 0 AND (TO_DAYS(koniec_okresu_ubezp) - TO_DAYS(pocz_okresu_ubezp)) > 31").order('(TO_DAYS(data_wznowienia) - TO_DAYS(NOW()))')
  end

  # ==== Insert 'presenter'-like methods below if necessary
end
