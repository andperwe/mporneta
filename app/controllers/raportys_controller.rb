class RaportysController < ApplicationController
    before_action :authenticate_user!

    def edit
      @raporty = Raporty.find(params[:id])
    end

    def update
     @raporty = Raporty.find(params[:id])
      respond_to do |format|
        if @raporty.update(raporty_params)
          format.js {  render action: "ok" }
        else
          format.js {  render action: "blad" }
        end
      end
    end

private

def raporty_params
  params.require(:raporty).permit(:L1, :L2, :L3, :L4, :L5, :L6, :L7, :L8, :L9, :L10, :L11, :L12, :L13, :L14, :L15, :L16, :L17, :L18, :email)
end

end
