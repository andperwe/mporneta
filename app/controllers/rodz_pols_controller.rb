class RodzPolsController < ApplicationController
  before_action :authenticate_user!
  def new
    @rodz_pol = RodzPol.new()
  end

  def create
      @rodz_pol = RodzPol.new(rodzpol_params)
      respond_to do |format|
        if @rodz_pol.save
          format.js {  render action: "ok" }
        else
          format.js {  render action: "blad" }
        end
      end
  end

private

def rodzpol_params
  params.require(:rodz_pol).permit( :nazwa_rodz, :towarzystwo_id, :typ)
end

end
