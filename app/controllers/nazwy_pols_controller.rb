class NazwyPolsController < ApplicationController
  def new
    @nazwy_pol = NazwyPol.new
  end

  def create
      @nazwy_pol = NazwyPol.new(nazwypol_params)
      respond_to do |format|
        if @nazwy_pol.save
          format.js {  render action: "ok" }
        else
          format.js {  render action: "blad" }
        end
      end
  end

private

def nazwypol_params
  params.require(:nazwy_pol).permit( :nazwa_polisy, :rodz_pol_id)
end

end
