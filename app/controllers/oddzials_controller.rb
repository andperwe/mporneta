class OddzialsController < ApplicationController
  before_action :authenticate_user!
   before_action :set_oddzial, only: [:edit, :update, :destroy]

   def index
     @oddzials = Oddzial.where("agencja_id = ?", params[:agencja_id])
   end


  def new
      @oddzial = Oddzial.new

  end

  # GET /twspolwlas/1/edit
  def edit
    @oddzial = Oddzial.find(params[:id])
    #@oddzial.agencje_id = params[:agencje_id]
  end

  # POST /twspolwlas
  # POST /twspolwlas.json
  def create
    @oddzial = Oddzial.new(oddzial_params)
    @oddzial.agencje_id = session[:agencjeid]
    respond_to do |format|
      if @oddzial.save

        format.js {  render action: "ok" }
      else
        format.js {  render action: "blad" }
      end
    end
  end

  # PATCH/PUT /twspolwlas/1
  # PATCH/PUT /twspolwlas/1.json
  def update
    respond_to do |format|
      if @oddzial.update(oddzial_params)
        format.js {  render action: "ok" }

      else
        format.js {  render action: "blad" }
      end
    end
  end
  # DELETE /twspolwlas/1
  # DELETE /twspolwlas/1.json
  def destroy
    respond_to do |format|
      @oddzial = Oddzial.find(params[:id])
      if @oddzial.destroy
        format.js {  render action: "u_ok" }
      else
        format.js {  render action: "u_blad" }
      end
   end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_oddzial
      @oddzial = Oddzial.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def oddzial_params
      params.require(:oddzial).permit(:miasto)
    end


end
