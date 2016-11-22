class PolisasController < ApplicationController
 before_action :authenticate_user!

 before_action :set_polisa, only: [:edit, :update, :destroy]

  # GET /polisas
  # GET /polisas.json
  def index
  #    if user_signed_in?
  puts user_signed_in?
    respond_to do |format|
      format.html
      format.json { render json: PolisaDatatable.new(view_context, { osoba_id: params[:osoba_id] }) }
    end
  #else
  #  respond_to do |format|
  #    format.html
  #  end
  #end
  end

  # GET /polisas/1
  # GET /polisas/1.json

  # GET /polisas/new
  def new
    @polisa = Polisa.new
    @polisa.save
    @agencje = Agencje.all
    @oddzial = Oddzial.where :agencje_id => current_user.agencje_id
    #@newid = NewPolisaid.new
    #@newid.save
    session[:polisaid] = @polisa.id
    @typy = TypPol.all
    @user = User.all
    #@pol_auto = PolAuto.new
    @polisa.user_id = current_user.id
    @polisa.agencje_id = current_user.agencje_id
    @typ_platnosci = TypPlatnosci.all
    @rodzaj_platnosci = RodzajPlatnosci.all
    @raty_sum = RatySum.all
    @towarzystwa = Towarzystwo.order(:nazwa).all
    #@pojazd_s = Pojazd.new
    #@marki_poj = MarkiPoj.all
    #@model_poj = ModelPoj.all
    #@rodzaj_poj = RodzajPoj.all
    #@nadwozie = Nadwozie.all
    #@paliwo = Paliwo.all
  end

  # GET /polisas/1/edit
  def edit
    #nie czyścic new_polisaid
    #@newid = NewPolisaid.first
    @polisa = Polisa.find(params[:id])
    @user= User.all
    @agencje = Agencje.all
    @oddzial = Oddzial.all
    session[:polisaid] = @polisa.id
    @typy = TypPol.all
    @typ_platnosci = TypPlatnosci.all
    @rodzaj_platnosci = RodzajPlatnosci.all
    @raty_sum = RatySum.all
    #@pol_auto = PolAuto.where :polisa_id => params[:id]
    #puts @pol_auto.id
    #@pojazd_s = Pojazd.all
    @nadwozie = Nadwozie.all
    @paliwo = Paliwo.all
    @towarzystwa = Towarzystwo.order(:nazwa).all
  end


  def rysuj_ryz_pol
    @ryz_pol = RyzPol.where :polisa_id => session[:polisaid]
    respond_to do |format|
      format.json {
         render :json => @ryz_pol
      }
    end
  end

def rysuj_wplaty

 @raty_sums = RatySum.where :polisa_id => session[:polisaid]
 respond_to do |format|
     format.html {render :partial => 'wplaty'}
 end
end



  def rysuj_ws
    @wspolwlas = Wspolwla.where :polisa_id => session[:polisaid]
    respond_to do |format|
        format.html {render :partial => 'wspolwla'}
    end
  end

  #def rysuj_tws
  #  @temp_wspolwlas = TempWspolwla.where :new_polisaid_id => session[:new_polid]
  #  respond_to do |format|
  #      format.html {render :partial => 'temp_wspolwla'}
  #  end
  #end

  def nazwy_pol_j
    @nazwy_pols = NazwyPol.where :rodz_pol_id => params[:rodz_pol_id]
    respond_to do |format|
      format.html { render :partial => 'nazwy_pol'}

    end
  end

  def t_rodzaj_p2
    @nazwy_pols = NazwyPol.where :rodz_pol_id => params[:rodz_pol_id]
    respond_to do |format|
      format.html { render :partial => 'trodzaj_2'}
    end
  end

  def ilosc_rat
    @maxs = RatySum.select('MAX(nr_raty) as maximum, nazwy_pol_id').where(:polisa_id => session[:polisaid]).group(:nazwy_pol_id).order('nr_raty DESC')
    respond_to do |format|
      format.json {
         render :json => @maxs
      }
    end
  end

  def rp_select
     @rp_select = RodzPol.where :towarzystwo_id => params[:id]
     respond_to do |format|
     format.html {
                   render :partial => 'rp_select'
                 }
     end
end

def szukaj_nr_pol
  @polisa = Polisa.where(:numer => params[:numer]).order('id DESC').first
 if @polisa.nil?
   respond_to do |format|
     format.json {
        render :json => '0'
     }
   end
 else
  respond_to do |format|
    format.json {
       render :json => @polisa.id
    }
  end
end
end


def szukaj_dw
  @raty_sum = RatySum.where(:nr_dw => params[:dw]).order('id DESC').first
  if @raty_sum.nil?
    respond_to do |format|
      format.json {
         render :json => '0'
      }
    end
  else
   @polisa = Polisa.find(@raty_sum.polisa_id)
   respond_to do |format|
     format.json {
        render :json => @polisa.id
     }
   end
 end
end


def szukaj_certyfikat
  @polisa = Polisa.where(:certyfikat => params[:certyfikat]).order('id DESC').first
 if @polisa.nil?
   respond_to do |format|
     format.json {
        render :json => '0'
     }
   end
 else
  respond_to do |format|
    format.json {
       render :json => @polisa.id
    }
  end
end
end

def szukaj_pl
  @polisa = Polisa.where(:pl => params[:pl]).order('id DESC').first
 if @polisa.nil?
   respond_to do |format|
     format.json {
        render :json => '0'
     }
   end
 else
  respond_to do |format|
    format.json {
       render :json => @polisa.id
    }
  end
end
end

#nr członkoski
def szukaj_kod_typu_klienta
  @polisa = Polisa.where(:kod_typu_klienta => params[:ktk]).order('id DESC').first
 if @polisa.nil?
   respond_to do |format|
     format.json {
        render :json => '0'
     }
   end
 else
  respond_to do |format|
    format.json {
       render :json => @polisa.id
    }
  end
end
end

def szukaj_nr_rej
 @pojazd = Pojazd.where(:nr_rej => params[:nr_rej]).order('id DESC').first
 if @pojazd.nil?
   respond_to do |format|
     format.json {
        render :json => '0'
     }
   end
 else
   @pol_auto = PolAuto.find_by('pojazd_id' => @pojazd.id)

  respond_to do |format|
    format.json {
       render :json => @pol_auto.polisa_id
    }
  end
end
end

def szukaj_nr_nadwozia
 @pojazd = Pojazd.where(:nr_nadw => params[:nr_nadw]).order('id DESC').first
 if @pojazd.nil?
   respond_to do |format|
     format.json {
        render :json => '0'
     }
   end
 else
   @pol_auto = PolAuto.find_by('pojazd_id' => @pojazd.id)

  respond_to do |format|
    format.json {
       render :json => @pol_auto.polisa_id
    }
  end
end
end


  #def update_towarzystwo
  #  @rodzpol = RodzPol.where(towarzystwo_id => params[:towarzystwo_id]).all
  #  render :partial => "rodzpol", :object => @rodzpol
  #end

  # POST /polisas
  # POST /polisas.json
  def create

    @polisa = Polisa.new(polisa_params)
    @polisa.user_id = current_user.id
    respond_to do |format|
      if @polisa.save #and @pojazd.save
        if pojazd_params == 0
            else
               @pol_auto = PolAuto.new
               @pol_auto.polisa_id = @polisa.id
               @pojazd = Pojazd.new(pojazd_params)
               @pojazd.save
               @pol_auto.pojazd_id = @pojazd.id
               @pol_auto.save
        end


        format.js {  render action: "ok" }
      else
        format.js {  render action: "blad" }
      end
    end
  end

  # PATCH/PUT /polisas/1
  # PATCH/PUT /polisas/1.json
  def update
    respond_to do |format|
      @polisa.user_id = current_user.id
      if @polisa.update(polisa_params)
        if pojazd_params == 0
          @pol_auto = PolAuto.find_by('polisa_id' => @polisa.id)
          if @pol_auto.nil?
          else
          @pojazd = Pojazd.find_by('id' => @pol_auto.pojazd_id)
          @pojazd.destroy
          @pol_auto.destroy
        end
        else
          @pol_auto = PolAuto.find_by('polisa_id' => @polisa.id)
          if @pol_auto.nil?
            @pol_auto = PolAuto.new
            @pol_auto.polisa_id = @polisa.id
            @pojazd = Pojazd.new(pojazd_params)
            @pojazd.save
            @pol_auto.pojazd_id = @pojazd.id
            @pol_auto.save
          else
            @pojazd = Pojazd.find_by('id' => @pol_auto.pojazd_id)
            @pojazd.update(pojazd_params)
          end
        end
        format.js {  render action: "ok" }
      else
        format.js {  render action: "blad" }
      end
    end
  end

  # DELETE /polisas/1
  # DELETE /polisas/1.json
  def destroy
    respond_to do |format|
      @polisa = Polisa.find(params[:id])
       #usuwa pojazd
        @pol_auto = PolAuto.find_by('polisa_id' => @polisa.id)
        if @pol_auto.nil?
        else
        @pojazd = Pojazd.find_by('id' => @pol_auto.pojazd_id)
        @pojazd.destroy
        @pol_auto.destroy
        end
      if @polisa.destroy
        format.js {  render action: "u_ok" }
      else
        format.js {  render action: "u_blad" }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_polisa
      @polisa = Polisa.find(params[:id])
    end


    # Never trust parameters from the scary internet, only allow the white list through.
    def polisa_params
      params.require(:polisa).permit(:osoba_id, :user_id, :agencje_id, :oddzial_id, :przypominac, :ubezpieczony, :towarzystwo_id, :rodz_pol_id, :nr_wniosku, :numer, :data_wnios, :certyfikat, :typ_pol_id, :pl, :ozn, :pocz_okresu_ubezp, :koniec_okresu_ubezp, :data_wystawienia, :data_wprowadzenia, :data_wznowienia, :polisa_zwrocona_po_sprzed, :data_zwrotu_polisy, :polisa_nie_podlega_wzn, :wystapila_szkoda, :zn, :zw, :kod_typu_klienta, :kod_rodzaju_polisy, :uwagi_dodatkowe, :typ_platnosci_id)
    end

    def pojazd_params
       if !params[:pojazd].nil?
          params.require(:pojazd).permit(:id, :nr_rej, :moc, :km, :kw, :marki_poj_id, :model_poj_id, :rodzaj_poj_id, :data_pierwszej_rej, :data_badan_techn, :pojemn, :przebieg, :rok_prod, :nr_nadw, :paliwo_id, :ilosc_miejsc, :nadwozie_id, :notatka)
       else
          pojazd_params = 0
       end
    end
end
