class PolisasController < ApplicationController
 before_action :authenticate_user!

 before_action :set_polisa, only: [:edit, :update, :destroy]

  # GET /polisas
  # GET /polisas.json
  def index

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
    @polisa = Polisa.find(params[:id])
    @user= User.all
    @agencje = Agencje.all
    @oddzial = Oddzial.all
    session[:polisaid] = @polisa.id
    @typy = TypPol.all
    @typ_platnosci = TypPlatnosci.all
    @rodzaj_platnosci = RodzajPlatnosci.all
    @raty_sum = RatySum.all
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

def close


    case params[:nazwa_dr_id].to_i
    when 1
      @numer = Polisa.select("numer, zmag_n, towarzystwo_id").where("id = ?", session[:polisaid]).first
    when 2
      @numer = Polisa.select("pl, zmag_zk, towarzystwo_id").where("id = ?", session[:polisaid]).first
    when 3
      @numer = Polisa.select("certyfikat, zmag_c, towarzystwo_id").where("id = ?", session[:polisaid]).first
    when 5
      @numer = Polisa.select("kod_typu_klienta, zmag_ktk, towarzystwo_id").where("id = ?", session[:polisaid]).first
    end



  # if @numer.numer.blank?
  #   @numer.numer = ""
  # end

 if params[:nazwa_dr_id].to_i == 1
   if @numer.numer != params[:numer]

  if params[:z_mag] == "true"
        Magazyn.where("idpol = ? AND nazwa_dr_id = ? AND towarzystwo_id = ?", session[:polisaid], params[:nazwa_dr_id], params[:towarzystwo_id]).first.destroy
    end

     if @numer.zmag_n
      @m_t = Magazyn.select("data_wpl").where("numer = ? AND towarzystwo_id = ? AND nazwa_dr_id = ? AND stan_id = 1", @numer.numer, @numer.towarzystwo_id, params[:nazwa_dr_id]).first
       @magazyn = Magazyn.new
       @magazyn.numer = @numer.numer
       @magazyn.towarzystwo_id = @numer.towarzystwo_id
       @magazyn.nazwa_dr_id = params[:nazwa_dr_id]
       @magazyn.stan_id = 2
       @magazyn.data_wpl = @m_t.data_wpl
       @magazyn.data_zda = Time.now.strftime('%Y-%m-%d')
       @magazyn.user_id = current_user.id
       @magazyn.idpol = session[:polisaid]
       @magazyn.save
     end
   end
 end


if params[:nazwa_dr_id].to_i == 2
   if @numer.pl != params[:numer]

    if params[:z_mag] == "true"
        Magazyn.where("idpol = ? AND nazwa_dr_id = ? AND towarzystwo_id = ?", session[:polisaid], params[:nazwa_dr_id], params[:towarzystwo_id]).first.destroy
    end

     if @numer.zmag_zk
      @m_t = Magazyn.select("data_wpl").where("numer = ? AND towarzystwo_id = ? AND nazwa_dr_id = ? AND stan_id = 1", @numer.pl, @numer.towarzystwo_id, params[:nazwa_dr_id]).first
       @magazyn = Magazyn.new
       @magazyn.numer = @numer.pl
       @magazyn.towarzystwo_id = @numer.towarzystwo_id
       @magazyn.nazwa_dr_id = params[:nazwa_dr_id]
       @magazyn.stan_id = 2
       @magazyn.data_wpl = @m_t.data_wpl
       @magazyn.data_zda = Time.now.strftime('%Y-%m-%d')
       @magazyn.user_id = current_user.id
       @magazyn.idpol = session[:polisaid]
       @magazyn.save
     end
   end
end

if params[:nazwa_dr_id].to_i == 3
   if @numer.certyfikat != params[:numer]

    if params[:z_mag] == "true"
        Magazyn.where("idpol = ? AND nazwa_dr_id = ? AND towarzystwo_id = ?", session[:polisaid], params[:nazwa_dr_id], params[:towarzystwo_id]).first.destroy
    end

     if @numer.zmag_c
      @m_t = Magazyn.select("data_wpl").where("numer = ? AND towarzystwo_id = ? AND nazwa_dr_id = ? AND stan_id = 1", @numer.certyfikat, @numer.towarzystwo_id, params[:nazwa_dr_id]).first
       @magazyn = Magazyn.new
       @magazyn.numer = @numer.certyfikat
       @magazyn.towarzystwo_id = @numer.towarzystwo_id
       @magazyn.nazwa_dr_id = params[:nazwa_dr_id]
       @magazyn.stan_id = 2
       @magazyn.data_wpl = @m_t.data_wpl
       @magazyn.data_zda = Time.now.strftime('%Y-%m-%d')
       @magazyn.user_id = current_user.id
       @magazyn.idpol = session[:polisaid]
       @magazyn.save
     end
   end
end

if params[:nazwa_dr_id].to_i == 5
   if @numer.kod_typu_klienta != params[:numer]

    if params[:z_mag] == "true"
        Magazyn.where("idpol = ? AND nazwa_dr_id = ? AND towarzystwo_id = ?", session[:polisaid], params[:nazwa_dr_id], params[:towarzystwo_id]).first.destroy
    end

     if @numer.zmag_ktk
      @m_t = Magazyn.select("data_wpl").where("numer = ? AND towarzystwo_id = ? AND nazwa_dr_id = ? AND stan_id = 1", @numer.kod_typu_klienta, @numer.towarzystwo_id, params[:nazwa_dr_id]).first
       @magazyn = Magazyn.new
       @magazyn.numer = @numer.kod_typu_klienta
       @magazyn.towarzystwo_id = @numer.towarzystwo_id
       @magazyn.nazwa_dr_id = params[:nazwa_dr_id]
       @magazyn.stan_id = 2
       @magazyn.data_wpl = @m_t.data_wpl
       @magazyn.data_zda = Time.now.strftime('%Y-%m-%d')
       @magazyn.user_id = current_user.id
       @magazyn.idpol = session[:polisaid]
       @magazyn.save
     end
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

def czysc_dw
  Magazyn.where("idpol = ? AND nazwa_dr_id = 4 AND stan_id = 2", session[:polisaid]).destroy_all
end


  def zmiana_tu
     #@polisa = Polisa.find(session[:polisaid])



     #if params[:zmag] # była z magazynu
    #     Magazyn.where("numer = ? AND towarzystwo_id = ? AND nazwa_dr_id = ? AND stan_id = 2", @polisa.numer, @polisa.towarzystwo_id, params[:nazwa_dr_id]).first.destroy
     #end
    if params[:zmag].to_i == 1
       if Magazyn.where("idpol = ? AND nazwa_dr_id = ? AND stan_id = 2", session[:polisaid], params[:nazwa_dr_id]).exists?
           Magazyn.where("idpol = ? AND nazwa_dr_id = ? AND stan_id = 2", session[:polisaid], params[:nazwa_dr_id]).first.destroy
       end
       @m_t = Magazyn.select("data_wpl").where("numer = ? AND towarzystwo_id = ? AND nazwa_dr_id = ? AND stan_id = 1", params[:numer], params[:towarzystwo_id], params[:nazwa_dr_id]).first
       @magazyn = Magazyn.new
       @magazyn.numer = params[:numer]
       @magazyn.towarzystwo_id = params[:towarzystwo_id]
       @magazyn.nazwa_dr_id = params[:nazwa_dr_id]
       @magazyn.stan_id = 2
       @magazyn.data_wpl = @m_t.data_wpl
       @magazyn.data_zda = Time.now.strftime('%Y-%m-%d')
       @magazyn.user_id = current_user.id
       @magazyn.idpol = session[:polisaid]
       @magazyn.save
     else
       if Magazyn.where("idpol = ? AND nazwa_dr_id = ? AND stan_id = 2", session[:polisaid], params[:nazwa_dr_id]).exists?
           Magazyn.where("idpol = ? AND nazwa_dr_id = ? AND stan_id = 2", session[:polisaid], params[:nazwa_dr_id]).first.destroy
       end
     end
     #if Magazyn.where("numer = ? AND towarzystwo_id = ? AND nazwa_dr_id = ? AND stan_id = 2", params[:numer], @polisa.towarzystwo_id, params[:nazwa_dr_id]).exists?
    #    Magazyn.where("numer = ? AND towarzystwo_id = ? AND nazwa_dr_id = ? AND stan_id = 2", params[:numer], @polisa.towarzystwo_id, params[:nazwa_dr_id]).first.destroy
    # end

  end

  # PATCH/PUT /polisas/1
  # PATCH/PUT /polisas/1.json
  def update
    respond_to do |format|
      @polisa.user_id = current_user.id
      if @polisa.update(polisa_params)
      #if @polisa.zmag_n
      #  if ViewVmag2.where("numer = ? AND towarzystwo_id = ? AND nazwa_dr_id = 1 AND stan_id = 1", @polisa.numer, @polisa.towarzystwo_id).exists?
      #    @magazyn = Magazyn.where("numer = ? AND towarzystwo_id = ? AND nazwa_dr_id = 1 AND stan_id = 1", @polisa.numer, @polisa.towarzystwo_id).first
      #    @magazyn1 = Magazyn.new
      #     @magazyn1.numer = @polisa.numer
      #     @magazyn1.towarzystwo_id = @polisa.towarzystwo_id
      #     @magazyn1.nazwa_dr_id = 1
      #     @magazyn1.stan_id = 2
      #     @magazyn1.data_wpl = @magazyn.data_wpl
      #     @magazyn1.data_zda = Time.now.strftime('%Y-%m-%d')
      #     @magazyn1.user_id = current_user.id
      #     @magazyn1.save
      #  end
      #end
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
        if Magazyn.where("idpol = ?", session[:polisaid]).exists?
            Magazyn.where("idpol = ?", session[:polisaid]).destroy_all
        end
        #if @polisa.zmag_n
        #  @magazyn = Magazyn.where("numer = ? AND towarzystwo_id = ? AND nazwa_dr_id = 1 AND stan_id = 2", @polisa.numer, @polisa.towarzystwo_id).first
        #  @magazyn.destroy
        #end

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
      params.require(:polisa).permit(:osoba_id, :user_id, :agencje_id, :oddzial_id, :przypominac, :ubezpieczony, :towarzystwo_id, :rodz_pol_id, :nr_wniosku, :numer, :data_wnios, :certyfikat, :typ_pol_id, :pl, :ozn, :pocz_okresu_ubezp, :koniec_okresu_ubezp, :data_wystawienia, :data_wprowadzenia, :data_wznowienia, :polisa_zwrocona_po_sprzed, :data_zwrotu_polisy, :polisa_nie_podlega_wzn, :wystapila_szkoda, :zn, :zw, :kod_typu_klienta, :kod_rodzaju_polisy, :uwagi_dodatkowe, :typ_platnosci_id, :zmag_n, :zmag_c, :zmag_zk, :zmag_ktk, :zmag_dw, :z_mag)
    end


    def pojazd_params
       if !params[:pojazd].nil?
          params.require(:pojazd).permit(:id, :nr_rej, :moc, :km, :kw, :marki_poj_id, :model_poj_id, :rodzaj_poj_id, :data_pierwszej_rej, :data_badan_techn, :pojemn, :przebieg, :rok_prod, :nr_nadw, :paliwo_id, :ilosc_miejsc, :nadwozie_id, :notatka)
       else
          pojazd_params = 0
       end
    end
end
