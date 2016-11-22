class PojazdsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_pojazd, only: [ :edit, :update, :destroy]
  layout 'bez_dodaj_op'
  def index
    respond_to do |format|
      format.html
      format.json { render json: PojazdDatatable.new(view_context) }
    end
  end

  # GET /pojazds/new
  def new
    @pojazd = Pojazd.new
    @pojazd.marki_poj = MarkiPoj.new
    @pojazd.model_poj = ModelPoj.new
    @pojazd.rodzaj_poj = RodzajPoj.new
    @nadwozie = Nadwozie.all
    @paliwo = Paliwo.all
    respond_to do |format|
    format.html {
                  render :partial => 'pojazd'
                }
    end
  end

  # GET /pojazds/1/edit
  #def edit
  #  @marki_poj = MarkiPoj.all
  #  @model_poj = ModelPoj.all
  #  @rodzaj_poj = RodzajPoj.all
  #  @nadwozie = Nadwozie.all
  #  @paliwo = Paliwo.all
  #end

  # POST /pojazds
  # POST /pojazds.json
  #def create
  #  @pojazd = Pojazd.new(pojazd_params)
  #  @pojazd.save

  #end

  # PATCH/PUT /pojazds/1
  # PATCH/PUT /pojazds/1.json
  def update
    respond_to do |format|
      if @pojazd.update(pojazd_params)
        format.html { redirect_to @pojazd, notice: 'Pojazd was successfully updated.' }
        format.json { render :show, status: :ok, location: @pojazd }
      else
        format.html { render :edit }
        format.json { render json: @pojazd.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pojazds/1
  # DELETE /pojazds/1.json
  def destroy
    @pojazd.destroy
    respond_to do |format|
      format.html { redirect_to pojazds_url, notice: 'Pojazd was successfully destroyed.' }
      format.json { head :no_content }
    end
  end


  def rysuj_pojazd
    @pol_auto = PolAuto.find_by('polisa_id' => session[:polisaid])
    @pojazd = Pojazd.find_by('id' => @pol_auto.pojazd_id)
    @marki_poj = MarkiPoj.all
    @model_poj = ModelPoj.all
    @rodzaj_poj = RodzajPoj.all
    @nadwozie = Nadwozie.all
    @paliwo = Paliwo.all

    respond_to do |format|
    format.html {
                  render :partial => 'pojazd'
                }
    end
  end

  def rszukaj_rej
     @pojazd = Pojazd.select("nr_rej").where("nr_rej LIKE concat(?, '%')", params[:term]).group("nr_rej").map { |t|
       { :label => t.nr_rej, :value => t.nr_rej } }
     respond_to do |format|
       format.json {
          render :json => @pojazd
       }
     end
  end

  def szukaj_rej
    @pojazd = Pojazd.joins( :marki_poj, :model_poj, :rodzaj_poj).select("*").where("nr_rej = ?", params[:nr_rej]).last
    @marki_poj = MarkiPoj.all
    @model_poj = ModelPoj.all
    @rodzaj_poj = RodzajPoj.all
    @nadwozie = Nadwozie.all
    @paliwo = Paliwo.all
    respond_to do |format|
      format.json {
         render :json => @pojazd
      }
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pojazd
      @pojazd = Pojazd.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def pojazd_params
      params.require(:pojazd).permit(:nr_rej, :moc, :km, :kw, :marki_poj_id, :model_poj_id, :rodzaj_poj_id, :data_pierwszej_rej, :data_badan_techn, :pojemn, :przebieg, :rok_prod, :nr_nadw, :paliwo_id, :ilosc_miejsc, :nadwozie_id, :notatka)
    end
end
