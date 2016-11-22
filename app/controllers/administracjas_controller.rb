class AdministracjasController < ApplicationController
  before_action :authenticate_user!
  layout 'bez_dodaj_op'
  def index
   if current_user.funkcje_id == 1
    respond_to do |format|
      format.html
    end
   else
     respond_to do |format|
       format.html { redirect_to(osobas_path) }
     end
   end
  end
end
