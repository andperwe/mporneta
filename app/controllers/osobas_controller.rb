class OsobasController < ApplicationController
  before_action :authenticate_user!
  #skip_before_filter :authenticate_user!
  before_action :set_osoba, only: [:edit, :update, :destroy]
  layout 'z_dodaj_op'
  # GET /osobas
  # GET /osobas.json


  def index
  #  if user_signed_in?
    @polisa = ViewOsoba.all
    respond_to do |format|
      format.html
      format.json { render json: OsobaDatatable.new(view_context)}
    end
  #else
  #  respond_to do |format|
  #    format.html
  #  end
  #end
  end

  # GET /osobas/1
  # GET /osobas/1.json


  # GET /osobas/new
  def new
    @osoba = Osoba.new

  end

  # GET /osobas/1/edit
  def edit
    @osoba = Osoba.find(params[:id])
  end

  # POST /osobas
  # POST /osobas.json
  def create
    @osoba = Osoba.new(osoba_params)
    respond_to do |format|
      if @osoba.save
        format.js {  render action: "ok" }
      else
        format.js {  render action: "blad" }
      end
    end
  end

  # PATCH/PUT /osobas/1
  # PATCH/PUT /osobas/1.json
  def update
    respond_to do |format|
      if @osoba.update(osoba_params)
        format.js {  render action: "ok" }
      else
        format.js {  render action: "blad" }
      end
    end

  end

  # DELETE /osobas/1
  # DELETE /osobas/1.json
  def destroy
    respond_to do |format|
      @osoba = Osoba.find(params[:id])
      if @osoba.destroy
        format.js {  render action: "u_ok" }
      else
        format.js {  render action: "u_blad" }
      end
    end

     #respond_to do |format|

      #flash[:success] = "Osoba usunięta !"
      #  format.html { redirect_to osobas_url, notice: 'Osoba was successfully destroyed.' }
      #  format.json { head :no_content }
      #  format.js
    #  end
#redirect_to messages_path
#end
  end

  def szukaj_form
     respond_to do |format|
       format.js
     end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_osoba
      @osoba = Osoba.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def osoba_params
      params.require(:osoba).permit(:nazwisko, :imie, :kod, :miejscowosc, :ulica, :kod_k, :miejscowosc_k, :ulica_k, :tel, :tel_kom, :email, :pesel, :typ_praw_id, :rok_ur, :Kat, :Data_ur, :data_wyd, :uwagi, :nip, :regon, :typ_prawny, :n_firmy)
    end
end
