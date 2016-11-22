class ExcelsController < ApplicationController
  before_action :authenticate_user!
  layout 'bez_dodaj_op'

def index
   @oddzials = Oddzial.where("agencje_id = ?", current_user.agencje_id)
   @excels = ViewExcel.where("data_wystawienia >= :od AND data_wystawienia <= :do AND oddzial_id = :oddzial_id", {:od => params[:od], :do => params[:do], :oddzial_id => params[:oddzial_id]})
   @rats = ViewRat.where("data_w >= :od AND data_w <= :do AND oddzial_id = :oddzial_id", {:od => params[:od], :do => params[:do], :oddzial_id => params[:oddzial_id]})
   @nr_wyk = params[:nr_wyk]
   @oddz = params[:oddzial]
   agencje = Agencje.select('nazwa_s').where("id = ?", current_user.agencje_id).take
  @posrednik = agencje.nazwa_s
  @data_wyk = params[:data_wyk]
  respond_to do |format|
    format.html
    format.xlsx
   end
end

#def generuj

#end
end
