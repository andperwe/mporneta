class TowarzystwosController < ApplicationController
 before_action :authenticate_user!
 layout 'bez_dodaj_op'
  def index
    respond_to do |format|
    format.html
    format.json { @towarzystwos = Towarzystwo.search(params[:term]) }
  end
end

def new
  @towarzystwo = Towarzystwo.new
end

def create
    @towarzystwo = Towarzystwo.new(towarzystwo_params)
    respond_to do |format|
      if @towarzystwo.save
        format.js {  render action: "ok" }
      else
        format.js {  render action: "blad" }
      end
    end
end

private

def towarzystwo_params
params.require(:towarzystwo).permit( :nazwa, :ulica, :kod, :miasto, :bank, :oddzial, :nr_konta, :nazwa_max, :email1, :email2, :tel, :fax, :tel_ass, :tel_szk)
end
end
