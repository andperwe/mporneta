class ModelPojsController < ApplicationController
  before_action :authenticate_user!
  def rszukaj_model

       @model_poj = ModelPoj.select("model").where("model LIKE concat(?, '%') and marki_poj_id = ?", params[:q], params[:marki_poj_id]).map { |t|
         { :label => t.model, :value => t.model } }
       respond_to do |format|
         format.json {
            render :json => @model_poj
         }
       end
    end

    def szukaj_model
        @model_poj = ModelPoj.where("model = ?", params[:model]).take
        respond_to do |format|
          format.json {
             render :json => @model_poj
          }
        end
    end

    def new
      @model_poj = ModelPoj.new()
    end

    def create
        @model_poj = ModelPoj.new(model_params)
        respond_to do |format|
          if @model_poj.save
            format.js {  render action: "ok" }
          else
            format.js {  render action: "blad" }
          end
        end
    end

  private

  def model_params
  params.require(:model_poj).permit( :model, :marki_poj_id)
  end
end
