class WspolwlasController < ApplicationController
 before_action :authenticate_user!
  before_action :set_wspolwla, only: [:edit, :update, :destroy]

  # GET /twspolwlas
  # GET /twspolwlas.json
  def index
    @wspolwlas = Wspolwla.where("polisa_id = ?", session[:polisaid])
  end

  # GET /twspolwlas/1
  # GET /twspolwlas/1.json

  # GET /twspolwlas/new
  def new
      @wspolwla = Wspolwla.new
  end

  # GET /twspolwlas/1/edit
  def edit
    @wspolwla = Wspolwla.find(params[:id])
  end

  # POST /twspolwlas
  # POST /twspolwlas.json
  def create
    @wspolwla = Wspolwla.new(wspolwla_params)
    @wspolwla.polisa_id = session[:polisaid]
    respond_to do |format|
      if @wspolwla.save
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
      if @wspolwla.update(wspolwla_params)
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
      @wspolwla = Wspolwla.find(params[:id])
      if @wspolwla.destroy
        format.js {  render action: "u_ok" }
      else
        format.js {  render action: "u_blad" }
      end
   end
end

  def rszukaj_pesel
     @wspolwla = Wspolwla.select("pesel").where("pesel LIKE concat(?, '%')", params[:term]).group("pesel").map { |t|
       { :label => t.pesel, :value => t.pesel } }
     respond_to do |format|
       format.json {
          render :json => @wspolwla
       }
     end
  end

  def szukaj_pesel
    @wspolwla = Wspolwla.where("pesel = ?", params[:pesel]).last
    respond_to do |format|
      format.json {
         render :json => @wspolwla
      }
    end
  end


  def ws
    [nazwisko, imie].compact.join(" ")
  end

  def rszukaj_nazwisko
     @wspolwla = Wspolwla.select("id,concat(nazwisko, ' ', imie) as ws").where("concat(nazwisko, ' ', imie) LIKE concat(?, '%')", params[:term]).map { |t|
       { :label => t.ws, :value => t.ws, :id => t.id } }
     respond_to do |format|
       format.json {
          render :json => @wspolwla
       }
     end
  end

  def szukaj_nazwisko
    @wspolwla = Wspolwla.find(params[:id])
    respond_to do |format|
      format.json {
         render :json => @wspolwla
      }
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_wspolwla
      @wspolwla = Wspolwla.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def wspolwla_params
      params.require(:wspolwla).permit(:nazwisko, :imie, :kod, :miejscowosc, :ulica, :pesel, :data_praw, :typ_praw_id, :uwagi)
    end
end
