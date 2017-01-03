class MagazynHDatatable < AjaxDatatablesRails::Base

  def sortable_columns
    # Declare strings in this format: ModelName.column_name
    @sortable_columns ||= ['ViewVmag3.data_zda']
  end

  def searchable_columns
    # Declare strings in this format: ModelName.column_name
    @searchable_columns ||= ['ViewVmag3.id']
  end

  private

  def data
    records.map do |record|
      [
        # comma separated list of the values for each cell of a table row
        # example: record.attribute,
        record.id,
        record.numer,
        record.nazwa,
        record.dokument,
        record.stan,
        record.user,
        record.data_wpl,
        record.data_zda
      ]
    end
  end

  def get_raw_records
    ViewVmag3.where("numer = ? and towarzystwo_id = ? and nazwa_dr_id = ?", params[:numer], params[:towarzystwo_id], params[:nazwa_dr_id])
    # insert query here
  end

  # ==== Insert 'presenter'-like methods below if necessary
end
