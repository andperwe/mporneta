class UserDatatable < AjaxDatatablesRails::Base
def_delegators :@view, :button_to, :edit_user_path, :user_path
  def sortable_columns
    # Declare strings in this format: ModelName.column_name
    @sortable_columns ||= ['User.id','Agencje.nazwa_s','Funkcje.nazwa_funkcji']
  end

  def searchable_columns
    # Declare strings in this format: ModelName.column_name
    @searchable_columns ||= ['User.nazwa']
  end

  private

  def data
    records.map do |record|
      [
        # comma separated list of the values for each cell of a table row
        # example: record.attribute,
        button_to("", edit_user_path(record.id),:method => :get, :class => "otworz_o", :remote => "true" ),
        if record.loginn != "admin"
          button_to("", user_path(:id => record.id),:method => :delete, :class => "usun_o", :remote => "true", data: {:confirm => 'Czy na pewno chcesz usunąć użytkownika ?'} )
        end,
        record.id,
        record.nazwa_s,
        record.nazwa_funkcji,
        record.nazwa,
        record.loginn,
        record.email
      ]
    end
  end

  def get_raw_records
    # insert query here
       User.select("users.id as id,nazwa_s,nazwa_funkcji,users.nazwa,loginn,users.email").joins(:agencje, :funkcje )
  end

  # ==== Insert 'presenter'-like methods below if necessary
end
