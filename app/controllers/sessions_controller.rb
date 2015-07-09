class SessionsController < ApplicationController

  # create session with new User or Existing user
  def create
  
    user = User.from_omniauth(env["omniauth.auth"])
    if user.present?
      session[:user_id] = user.id 
      $auth = request.env["omniauth.auth"].extra.access_token
    end
    redirect_to  root_path
  end


  # destroy the session for User 
  def destroy

    session[:user_id] = nil
    redirect_to  root_path

  end

end
