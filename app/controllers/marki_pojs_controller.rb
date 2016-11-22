class MarkiPojsController < ApplicationController
before_action :authenticate_user!
  def rszukaj_marka
       @marki_poj = MarkiPoj.select("marka").where("marka LIKE concat(?, '%')", params[:term]).map { |t|
         { :label => t.marka, :value => t.marka } }
       respond_to do |format|
         format.json {
            render :json => @marki_poj
         }
       end
    end

    def szukaj_marka
        @marki_poj = MarkiPoj.where("marka = ?", params[:marka]).take

        respond_to do |format|
          format.json {
             render :json => @marki_poj
          }
        end
    end

    def new
      @marki_poj = MarkiPoj.new()
    end

    def create
        @marki_poj = MarkiPoj.new(marki_params)
        respond_to do |format|
          if @marki_poj.save
            format.js {  render action: "ok" }
          else
            format.js {  render action: "blad" }
          end
        end
    end

private

def marki_params
  params.require(:marki_poj).permit( :marka)
end

end
