class RyzPolsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_ryz_pol, only: [:edit, :update, :destroy]

  # GET /ryz_pols
  # GET /ryz_pols.json
  def index
    @ryz_pols = RyzPol.all
  end

  # GET /ryz_pols/1
  # GET /ryz_pols/1.json


  # GET /ryz_pols/new
  def new
    @ryz_pol = RyzPol.new
  end

  # GET /ryz_pols/1/edit
  def edit
  end

  # POST /ryz_pols
  # POST /ryz_pols.json
  def create
    @ryz_pol = RyzPol.new(ryz_pol_params)

    respond_to do |format|
      if @ryz_pol.save
        format.html { redirect_to @ryz_pol, notice: 'Ryz pol was successfully created.' }
        format.json { render :show, status: :created, location: @ryz_pol }
      else
        format.html { render :new }
        format.json { render json: @ryz_pol.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /ryz_pols/1
  # PATCH/PUT /ryz_pols/1.json
  def update
    respond_to do |format|
      if @ryz_pol.update(ryz_pol_params)
        format.html { redirect_to @ryz_pol, notice: 'Ryz pol was successfully updated.' }
        format.json { render :show, status: :ok, location: @ryz_pol }
      else
        format.html { render :edit }
        format.json { render json: @ryz_pol.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /ryz_pols/1
  # DELETE /ryz_pols/1.json
  def destroy
    @ryz_pol.destroy
    respond_to do |format|
      format.html { redirect_to ryz_pols_url, notice: 'Ryz pol was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def zapisz_json
    #usun
     RyzPol.where(:polisa_id => session[:polisaid]).destroy_all
     #zapisz
     params[:ryzykas].each do |ryzyka|
        ActionController::Parameters.permit_all_parameters = true
        params = ActionController::Parameters.new(ryzyka)
        @ryzyka = RyzPol.new(params)
        @ryzyka.polisa_id = session[:polisaid]
        @ryzyka.save
      end

      #@raty_sums = RatySum.where :polisa_id => @raty_sum.polisa_id

      respond_to do |format|
          format.json { }
      end

  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ryz_pol
      @ryz_pol = RyzPol.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def ryz_pol_params
      params.require(:ryz_pol).permit(:idryz, :idpol, :suma_ubezp, :stawka, :uwagi, :waluta, :kod_taryfy, :przypis, :ilosc)
    end
end
