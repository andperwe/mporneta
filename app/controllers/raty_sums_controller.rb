class RatySumsController < ApplicationController
  before_action :authenticate_user!
  #include ActiveModel::Serializers::JSON
  before_action :set_raty_sum, only: [:show, :edit, :update, :destroy]

  def new
    @raty_sums = RatySum.new
  end

  def edit
      @raty_sums = RatySum.find(params[:id])
  end

  def index
    @raty_sums = RatySum.all
  end

  def zapisz_json
     params[:ratys].each do |raty|
        ActionController::Parameters.permit_all_parameters = true
        params = ActionController::Parameters.new(raty)
        @raty_sum = RatySum.new(params)
        @raty_sum.polisa_id = session[:polisaid]
        @raty_sum.save
      end

      #@raty_sums = RatySum.where :polisa_id => @raty_sum.polisa_id

      respond_to do |format|
          format.json { }
      end

  end

  def zapisz_raty
   if params[:data_w].blank?
      @data_w = nil
   else
      @data_w = params[:data_w]
   end

   if params[:data_roz].blank?
      @data_roz = nil
   else
      @data_roz = params[:data_roz]
   end
   if params[:zmag_dw] == 'true'
    @zmag_dw = 1
   else
    @zmag_dw = 0
   end

  RatySum.select("nr_dw").where("polisa_id = ? and nr_raty = ? and zmag_dw = 1",session[:polisaid], params[:nr_raty]).each do |ratysum|
    if ratysum.nr_dw != params[:nr_dw]
      if Magazyn.where("idpol = ? AND numer = ? AND nazwa_dr_id = 4 AND stan_id = 2", session[:polisaid], ratysum.nr_dw).exists?
        Magazyn.where("idpol = ? AND numer = ? AND nazwa_dr_id = 4 AND stan_id = 2", session[:polisaid], ratysum.nr_dw).first.destroy
      end
    end
  end

   RatySum.where('polisa_id = ? and nr_raty = ?',session[:polisaid], params[:nr_raty] ).update_all(przypominac: params[:przypominac], data: params[:data], nr_dw: params[:nr_dw], data_w: @data_w, zapl: params[:zapl], rozliczona: params[:rozliczona], data_roz: @data_roz, roz_owca: params[:roz_owca], zmag_dw: @zmag_dw)
  respond_to do |format|
  #   if @osoba.save
       format.js {  render action: "ok" }
  #   else
  #     format.js {  render action: "blad" }
  #   end
  end
  end

  def create
    @raty_sums = RatySum.new(raty_sum_params)

    respond_to do |format|
      if @raty_sum.save
        format.html { redirect_to @raty_sum, notice: 'Raty sumy was successfully created.' }
        format.json { render :show, status: :created, location: @raty_sum }
      else
        format.html { render :new }
        format.json { render json: @raty_sum.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /raty_sumies/1
  # PATCH/PUT /raty_sumies/1.json

  def ilosc_rata
   @ilosc = RatySum.where('polisa_id = ? and nazwy_pol_id = ?',session[:polisaid], params[:nazwy_pol_id]).count
   respond_to do |format|
     format.json {
        render :json => @ilosc
     }
   end
  end

  def update
    @old=@raty_sum.kwota
    respond_to do |format|
      if @raty_sum.update(raty_sum_params)
      @roznica =  @old - @raty_sum.kwota
         ilosc = RatySum.where('polisa_id = ? and nazwy_pol_id = ?',session[:polisaid], @raty_sum.nazwy_pol_id).count
         if ilosc > @raty_sum.nr_raty
          @raty_sum =  RatySum.where('polisa_id = ? and nazwy_pol_id = ? and nr_raty = ?', session[:polisaid], @raty_sum.nazwy_pol_id, ilosc).take
          @raty_sum.kwota = @raty_sum.kwota + @roznica
          @raty_sum.save
         else
          @raty_sum =  RatySum.where('polisa_id = ? and nazwy_pol_id = ? and nr_raty = ?', session[:polisaid], @raty_sum.nazwy_pol_id, 1).take
          @raty_sum.kwota = @raty_sum.kwota + @roznica
          @raty_sum.save
         end
        format.js { }
      else
        format.js { }
      end
    end
  end

  # DELETE /raty_sumies/1
  # DELETE /raty_sumies/1.json
  def destroy
    @raty_sum.destroy
    respond_to do |format|
      format.html { redirect_to raty_sumies_url, notice: 'Raty sumy was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def usun
    RatySum.where(:polisa_id => session[:polisaid]).destroy_all
    respond_to do |format|
      format.json { head :no_content }
    end
  end

 def zmag_dw

   #@old = RatySum.select("zmag_dw, nr_dw").where('polisa_id = ? AND nr_raty = ?', session[:polisaid], params[:nr_raty]).first
    # if @old.zmag_dw
    #   @count = RatySum.where("polisa_id = ? AND nr_dw = ?", session[:polisaid], @old.nr_dw).count
    #   if @count.count == 1
    #      Magazyn.where("idpol = ? AND numer = ? AND towarzystwo_id = ? AND stan_id = 2 AND nazwa_dr_id = 4", session[:polisaid], @old.nr_dw, params[:towarzystwo_id]).first.destroy
    #   end
     #end

  if ! params[:old_dw].blank?
     @count = RatySum.where("polisa_id = ? AND nr_dw = ?", session[:polisaid], params[:old_dw]).count

     if @count.to_i < 2
        Magazyn.where("idpol = ? AND numer = ? AND towarzystwo_id = ? AND stan_id = 2 AND nazwa_dr_id = 4", session[:polisaid], params[:old_dw], params[:towarzystwo_id]).first.destroy
     end
  end

  if params[:zmag].to_i == 1 #jeżeli jest z magazynu
    @m_t = Magazyn.select("data_wpl").where("numer = ? AND towarzystwo_id = ? AND nazwa_dr_id = 4 AND stan_id = 1", params[:numer], params[:towarzystwo_id]).first
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
  end
 end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_raty_sum
      @raty_sum = RatySum.find(params[:id])
    end

    #def raty_s_params
    #  params.require(:raty).permit(:polisa_id, :data, :zapl, :nr_dw, :nr_raty, :rodzaj_platnosci_id, :nazwy_pol_id, :kwota, :data_w, :typ_platnosci_id)
    #end
    # Never trust parameters from the scary internet, only allow the white list through.
    def raty_sum_params
      params.require(:raty_sum).permit(:kwota, :data, :zapl, :rodzaj_platnosci_id, :nr_dw, :nr_raty, :nazwy_pol_id, :prow_proc, :prow_kwota, :prow_ag_proc, :prow_ag_kwota, :prow_otrzymana, :uwagi, :data_w, :prow_dowolna, :odsetki, :id_agent, :rozliczona, :roz_owca, :nr_wyk, :data_roz, :kwota_owca, :kom, :przypominac, :typ_platnosci_id, :zmag_dw, :numer, :towarzystwo_id, :nazwa_dr_id, :zmag, :old_dw)
    end
end
