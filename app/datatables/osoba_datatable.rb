class OsobaDatatable < AjaxDatatablesRails::Base
def_delegators :@view, :button_to, :edit_osoba_path
  def sortable_columns
    # Declare strings in this format: ModelName.column_name
   @sortable_columns ||= ['ViewOsoba.id']
  end

  def searchable_columns
    # Declare strings in this format: ModelName.column_name
    @searchable_columns ||= ['ViewOsoba.ubezpieczony', 'ViewOsoba.pesel']

  end

  private

  def data
    records.map do |record|
      [
        # comma separated list of the values for each cell of a table row
        # example: record.attribute,
        button_to("", edit_osoba_path(record.id),:method => :get, :class => "otworz_o", :remote => "true" ),
        record.id,
        record.ubezpieczony,
        record.miejscowosc,
        record.ulica,
        record.tel,
        record.pesel,
        record.uwagi
      ]
    end
  end

  def get_raw_records
    # insert query here
    ViewOsoba.all
  end
  # ==== Insert 'presenter'-like methods below if necessary
end
