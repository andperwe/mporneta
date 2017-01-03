class ExcelsController < ApplicationController
  before_action :authenticate_user!
  layout 'bez_dodaj_op'

def index
   @oddzials = Oddzial.where("agencje_id = ?", current_user.agencje_id)
   @excels = ViewExcel.where("data_wystawienia >= ? AND data_wystawienia <= ?", params[:od], params[:do])
   @rats = ViewRat.where("data_w >= ? AND data_w <= ?", params[:od], params[:do])

   @oddz = ""
   if params[:oddzial_id].present?
     @excels = @excels.where("oddzial_id = ?", params[:oddzial_id])
     @rats = @rats.where("oddzial_id = ?", params[:oddzial_id])
     @oddz = params[:oddzial]
   end

   if params[:towarzystwo].present?
     @excels = @excels.where("nazwa = ?", params[:towarzystwo])
     @rats = @rats.where("nazwa = ?", params[:towarzystwo])
   end

   @nr_wyk = params[:nr_wyk]
   agencje = Agencje.select('nazwa_s').where("id = ?", current_user.agencje_id).take
  @posrednik = agencje.nazwa_s
  @data_wyk = params[:data_wyk]
  @towarzystwas = Towarzystwo.order(:nazwa).all
  respond_to do |format|
    format.html
    format.xlsx
   end
end

#def generuj

#end
end
