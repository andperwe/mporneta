class AgencjaDatatable < AjaxDatatablesRails::Base
  def_delegators :@view, :button_to, :edit_agencje_path, :agencje_path

  def sortable_columns
    # Declare strings in this format: ModelName.column_name
    @sortable_columns ||= ['Agencje.id','Agencje.nazwa', 'Agencje.wlasciciel', 'Agencje.nazwa_s']
  end

  def searchable_columns
    # Declare strings in this format: ModelName.column_name
    @searchable_columns ||= ['Agencje.id']
  end

  private

  def data
    records.map do |record|
      [
        # comma separated list of the values for each cell of a table row
        # example: record.attribute,
        button_to("", edit_agencje_path(record.id),:method => :get, :class => "otworz_o", :remote => "true" ),
        button_to("", agencje_path(:id => record.id),:method => :delete, :class => "usun_o", :remote => "true",  data: {:confirm => 'Czy na pewno chcesz usunąć agencje ?'} ),
        record.id,
        record.nazwa,
        record.wlasciciel,
        record.tel,
        record.kod,
        record.miasto,
        record.adres,
        record.nazwa_s
      ]
    end
  end

  def get_raw_records
    Agencje.all
    # insert query here
  end

  # ==== Insert 'presenter'-like methods below if necessary
end
