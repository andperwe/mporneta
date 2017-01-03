class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: [:edit, :update, :destroy]
  layout 'administracja', only: [:index]
  def index
  if current_user.funkcje_id == 1
     respond_to do |format|
      format.json { render json: UserDatatable.new(view_context) }
      format.html
     end
   else
      respond_to do |format|
        format.html { redirect_to(osobas_path) }
      end
    end
 end

 def new
   @user = User.new
 end

 def edit
   @user = User.find(params[:id])
 end

 def update
   if @user.id == current_user.id
     respond_to do |format|
          if @user.update(user_params)
            format.js {  render action: "ok_wyloguj" }
          else
            format.js {  render action: "blad" }
         end
        end
   else
     respond_to do |format|
          if @user.update(user_params)
            format.js {  render action: "ok" }
          else
            format.js {  render action: "blad" }
         end
        end
   end

#   respond_to do |format|
#     if @user.update(user_params)
#       format.js {  render action: "ok" }
#     else
#       format.js {  render action: "blad" }
#     end
#   end
 end

 def destroy
   respond_to do |format|
     @user = User.find(params[:id])
     if @user.destroy
       format.js {  render action: "u_ok" }
     else
       format.js {  render action: "u_blad" }
     end
   end
 end

 def create
   @user = User.new(user_params)
   respond_to do |format|
     if @user.save
       format.js {  render action: "ok" }
     else
       format.js {  render action: "blad" }
     end
   end
 end

 private
   # Use callbacks to share common setup or constraints between actions.
   def set_user
     @user = User.find(params[:id])
   end

   # Never trust parameters from the scary internet, only allow the white list through.
   def user_params
     params.require(:user).permit(:agencje_id, :email, :funkcje_id, :loginn, :nazwa, :password)
   end

end
