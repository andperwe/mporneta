class PojazdDatatable < AjaxDatatablesRails::Base

def_delegators :@view

  def sortable_columns
    # Declare strings in this format: ModelName.column_name
    @sortable_columns ||= ['Pojazd.id']
  end

  def searchable_columns
    # Declare strings in this format: ModelName.column_name
    @searchable_columns ||= ['Pojazd.nr_rej']
  end

  private

  def data
    records.map do |record|
      [
         record.id,
         record.nr_rej,
         record.marka,
         record.model,
         record.rodzaj,
         record.nr_nadw,
         record.notatka,
         record.polisa_id
        # comma separated list of the values for each cell of a table row
        # example: record.attribute,
      ]
    end
  end

  def get_raw_records
    # insert query here
    Pojazd.select("pojazds.id, nr_rej, marka, model, rodzaj, nr_nadw, notatka, polisa_id").joins(:marki_poj, :model_poj, :rodzaj_poj, :pol_auto)
  end

  # ==== Insert 'presenter'-like methods below if necessary
end
