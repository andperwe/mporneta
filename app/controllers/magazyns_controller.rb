class MagazynsController < ApplicationController
  before_action :authenticate_user!
  layout 'bez_dodaj_op'

  def index
    @towarzystwa = Towarzystwo.order(:nazwa).all
    respond_to do |format|
      format.html
      #format.json { render json: PojazdDatatable.new(view_context) }
    end
  end
end
