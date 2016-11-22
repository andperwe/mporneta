class RyzykasController < ApplicationController
  before_action :authenticate_user!
  layout 'bez_dodaj_op'

def index
 respond_to do |format|
   format.html
 end
end

def rysuj_grupy
  @grupy = RodzPol.where("towarzystwo_id = ?", params[:towarzystwo_id])
  respond_to do |format|
    format.json {
       render :json => @grupy
    }
  end
end

def szukaj_grupy
  @szukaj = RodzPol.where("towarzystwo_id = ? AND nazwa_rodz = ?", params[:towarzystwo_id], params[:nazwa_rodz])
  respond_to do |format|
    format.json {
       render :json => @szukaj
    }
  end
end

def szukaj_np
  @szukajnp = NazwyPol.where("rodz_pol_id = ? AND nazwa_polisy = ?", params[:rodz_pol_id], params[:nazwa_polisy])
  respond_to do |format|
    format.json {
       render :json => @szukajnp
    }
  end
end


def rysuj_ryzyka
  @nazwy_pols = NazwyPol.where("rodz_pol_id = ?", params[:rodz_pol_id])
  respond_to do |format|
    format.html { render :partial => 'nazwy_ryzyk'}
  end
end

def tu_ryzyka
   @tu_ryzyka = Towarzystwo.order(:nazwa).all
   respond_to do |format|
   format.html {
                 render :partial => 'tu_ryzyka'
               }
   end
end


end
