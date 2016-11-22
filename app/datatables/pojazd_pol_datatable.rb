class PojazdPolDatatable < AjaxDatatablesRails::Base
 def_delegators :@view, :button_to, :edit_polisa_path
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
        button_to("", edit_polisa_path(record.id),:method => :get, :class => "otworz_o", :remote => "true" ),
        record.id,
        record.numer,
        record.pocz_okresu_ubezp,
        record.koniec_okresu_ubezp,
        record.data_wystawienia,
        record.polisa_n_r,
        record.ubezpieczony,
        record.dni
        # comma separated list of the values for each cell of a table row
        # example: record.attribute,
      ]
    end
  end

  def get_raw_records
    # insert query here
      Polisa.select("polisas.id,numer,nazwa,nazwa_rodz,pocz_okresu_ubezp,koniec_okresu_ubezp,data_wystawienia,ubezpieczony").joins(:towarzystwo, :rodz_pol ).where("polisas.id = ?", params[:polisa_id])
  end

  # ==== Insert 'presenter'-like methods below if necessary
end
