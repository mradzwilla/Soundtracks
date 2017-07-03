Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index', as: 'index'
  get 'playlist', to: 'playlist#index', defaults: {format: :json}
  get 'authentication', to: 'authentication#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
