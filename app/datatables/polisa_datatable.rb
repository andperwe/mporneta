class PolisaDatatable < AjaxDatatablesRails::Base
def_delegators :@view, :button_to, :edit_polisa_path
  def sortable_columns
    # Declare strings in this format: ModelName.column_name
    @sortable_columns ||= ['Polisa.id']
  end

  def searchable_columns
    # Declare strings in this format: ModelName.column_name
    @searchable_columns ||= ['Polisa.osoba_id']
  end

  private

  def data
    records.map do |record2|
      [
        button_to("", edit_polisa_path(record2.id),:method => :get, :class => "otworz_o", :remote => "true" ),
        record2.id,
        record2.numer,
        record2.pocz_okresu_ubezp,
        record2.koniec_okresu_ubezp,
        record2.data_wystawienia,
        record2.polisa_n_r,
        record2.sprzedany,
        record2.dni,
        record2.osoba_id
        # comma separated list of the values for each cell of a table row
        # example: record.attribute,
      ]
    end
  end

  def get_raw_records
    Polisa.select("polisas.id,numer,nazwa,nazwa_rodz,pocz_okresu_ubezp,koniec_okresu_ubezp,data_wystawienia,polisa_nie_podlega_wzn,osoba_id").joins(:towarzystwo, :rodz_pol ).where("osoba_id = ?", params[:osoba_id])
    # insert query here
  end

  # ==== Insert 'presenter'-like methods below if necessary
end
