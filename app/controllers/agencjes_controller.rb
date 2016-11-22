class AgencjesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_agencje, only: [:edit, :update, :destroy]
  def index
     respond_to do |format|
      format.json { render json: AgencjaDatatable.new(view_context) }
     end
  end

  def new
    @agencje = Agencje.new
  end

  def edit
    @agencje = Agencje.find(params[:id])
    #puts @agencje.id
  @oddzials = Oddzial.where :agencje_id => @agencje.id
  end

  def update
    respond_to do |format|
      if @agencje.update(agencje_params)
        format.js {  render action: "ok" }
      else
        format.js {  render action: "blad" }
      end
    end
  end

  def destroy
    respond_to do |format|
      @agencje = Agencje.find(params[:id])
      if @agencje.destroy
        format.js {  render action: "u_ok" }
      else
        format.js {  render action: "u_blad" }
      end
    end
  end

  def create
    @agencje = Agencje.new(agencje_params)
    respond_to do |format|
      if @agencje.save
        format.js {  render action: "ok" }
      else
        format.js {  render action: "blad" }
      end
    end
  end

  def rysuj_oddzial
    @oddzials = Oddzial.where :agencje_id => params[:agencje_id]
    respond_to do |format|
        format.html {render :partial => 'oddzial'}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_agencje
      @agencje = Agencje.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def agencje_params
      params.require(:agencje).permit(:nazwa, :wlasciciel, :tel, :kod, :miasto,:adres, :nazwa_s)
    end

end
