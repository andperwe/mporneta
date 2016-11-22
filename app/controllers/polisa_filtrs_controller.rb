class PolisaFiltrsController < ApplicationController
before_action :authenticate_user!
def index
  respond_to do |format|
    #format.html
    format.json { render json: PojazdPolDatatable.new(view_context, { id: params[:polisa_id] })}#, { osoba_id: params[:osoba_id] }) }
  end
end
end
