class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.

  #protect_from_forgery with: :exception
  #  before_action :authenticate_user!
#    auto_session_timeout 1.minutes
def redirect_user
  redirect_to '/404'
end

  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
  #before_action :authenticate_user!
  protected

  def configure_permitted_parameters
    added_attrs = [:loginn, :nazwa, :funkcje_id, :agencje_id, :email, :password, :password_confirmation, :remember_me]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    devise_parameter_sanitizer.permit :account_update, keys: added_attrs
  end
end
