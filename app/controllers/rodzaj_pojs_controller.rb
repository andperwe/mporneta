class RodzajPojsController < ApplicationController
  before_action :authenticate_user!
  def rszukaj_rodzaj
       @rodzaj_poj = RodzajPoj.select("rodzaj").where("rodzaj LIKE concat(?, '%')", params[:term]).map { |t|
         { :label => t.rodzaj, :value => t.rodzaj } }
       respond_to do |format|
         format.json {
            render :json => @rodzaj_poj
         }
       end
    end

    def szukaj_rodzaj
        @rodzaj_poj = RodzajPoj.where("rodzaj = ?", params[:rodzaj]).take
        respond_to do |format|
          format.json {
             render :json => @rodzaj_poj
          }
        end
    end

    def new
      @rodzaj_poj = RodzajPoj.new()
    end

    def create
        @rodzaj_poj = RodzajPoj.new(rodzaj_params)
        respond_to do |format|
          if @rodzaj_poj.save
            format.js {  render action: "ok" }
          else
            format.js {  render action: "blad" }
          end
        end
    end

  private

  def rodzaj_params
  params.require(:rodzaj_poj).permit( :rodzaj)
  end
end
