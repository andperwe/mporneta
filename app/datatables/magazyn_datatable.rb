class MagazynDatatable < AjaxDatatablesRails::Base
def_delegators :@view, :button_to, :edit_magazyn_path, :params

  def sortable_columns
    # Declare strings in this format: ModelName.column_name
    @sortable_columns ||= ['ViewVmag2.id_n']
  end

  def searchable_columns
    # Declare strings in this format: ModelName.column_name
    @searchable_columns ||= ['ViewVmag2.id_n']

  end

  private

  def data
    records.map do |record|
      [
        # comma separated list of the values for each cell of a table row
        # example: record.attribute,
         button_to("", edit_magazyn_path(record.id_n),:method => :get, :class => "otworz_o",:remote => true, params: {typ:0} ),
        button_to("", edit_magazyn_path(record.id_n),:method => :get, :class => "otworz_h",:remote => true, params: {typ:1} ),
        record.id_n,
        record.numer,
        record.nazwa,
        record.dokument,
        record.uzytkownik,
        record.stan,
        record.data_wpl,
        record.data_zda
      ]
    end
  end

  def get_raw_records
    # insert query here
       q = ViewVmag2.all
       if params[:numer] != ""
         q = q.where("numer like ?", params[:numer]+'%')
       end

       if params[:towarzystwo_id].to_i > 0
          q = q.where("towarzystwo_id = ?", params[:towarzystwo_id])
       end

       if params[:nazwa_dr_id].to_i > 0
          q = q.where("nazwa_dr_id = ?", params[:nazwa_dr_id])
       end

       if params[:stan_id].to_i > 0
          q = q.where("stan_id = ?", params[:stan_id])
       end

       if params[:user_id].to_i > 0
          q = q.where("user_id = ?", params[:user_id])
       end

       if params[:data_wpl] != ""
         q = q.where("data_wpl like ?", params[:data_wpl]+'%')
       end

       if params[:data_zda] != ""
         q = q.where("data_zda like ?", params[:data_zda]+'%')
       end


       get_raw_records = q
  end

  # ==== Insert 'presenter'-like methods below if necessary
end
