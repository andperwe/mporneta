class PrzypomnieniaRatDatatable < AjaxDatatablesRails::Base

  def sortable_columns
    # Declare strings in this format: ModelName.column_name
    @sortable_columns ||= ['polisas.id']
  end

  def searchable_columns
    # Declare strings in this format: ModelName.column_name
    @searchable_columns ||= []
  end

  private

  def data
    records.map do |record|
      [
        # comma separated list of the values for each cell of a table row
        # example: record.attribute,
        record.id,
        record.osoba_id,
        record.numer,
        record.ubezpieczony,
        record.polisa_n_r,
        record.data,
        record.kwota_r,
        record.nr_raty,
        record.tel,
        record.email,
        record.ilosc_dni_r
      ]
    end
  end

  def get_raw_records
    # insert query here
  Polisa.select("polisas.id, numer, osoba_id, ubezpieczony, osobas.tel, email, nazwa, nazwa_rodz, format(sum(kwota),2,'pl_PL') as kwota_r, raty_sums.data, nr_raty, TO_DAYS(raty_sums.data) - TO_DAYS(NOW()) as ilosc_dni_r").joins(:raty_sums, :osoba, :towarzystwo, :rodz_pol).where("polisas.przypominac = 0 AND polisa_zwrocona_po_sprzed = 0 AND polisa_nie_podlega_wzn = 0 AND (TO_DAYS(koniec_okresu_ubezp) - TO_DAYS(pocz_okresu_ubezp)) > 31
  AND nr_raty > 1
  AND (TO_DAYS(data) - TO_DAYS(NOW())) > 0
  AND (TO_DAYS(data) - TO_DAYS(NOW())) < 31").group(:polisa_id, :nr_raty, :data).order("TO_DAYS(raty_sums.data) - TO_DAYS(NOW())")
end
  # ==== Insert 'presenter'-like methods below if necessary
end
