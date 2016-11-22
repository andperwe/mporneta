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
   RatySum.where('polisa_id = ? and nr_raty = ?',session[:polisaid], params[:nr_raty] ).update_all(przypominac: params[:przypominac], data: params[:data], nr_dw: params[:nr_dw], data_w: params[:data_w], zapl: params[:zapl], rozliczona: params[:rozliczona], data_roz: params[:data_roz], roz_owca: params[:roz_owca])
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
      params.require(:raty_sum).permit(:kwota, :data, :zapl, :rodzaj_platnosci_id, :nr_dw, :nr_raty, :nazwy_pol_id, :prow_proc, :prow_kwota, :prow_ag_proc, :prow_ag_kwota, :prow_otrzymana, :uwagi, :data_w, :prow_dowolna, :odsetki, :id_agent, :rozliczona, :roz_owca, :nr_wyk, :data_roz, :kwota_owca, :kom, :przypominac, :typ_platnosci_id)
    end
end
