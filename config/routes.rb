Rails.application.routes.draw do

  root to: 'ats#index'

  resources :ats , :defaults => { :format => 'json' }

  get '/auth/:upwork/callback' => 'sessions#create', via: [:get, :post]

  match 'auth/failure', to: redirect('/'), via: [:get, :post]

  match 'signout', to: 'sessions#destroy', as: 'signout', via: [:get, :post]

end
