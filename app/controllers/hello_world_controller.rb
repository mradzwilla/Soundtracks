class HelloWorldController < ApplicationController
  layout "hello_world"
	require 'json'

  def index
  	@params = params
  	@auth_code = @params['code']
  	puts params.to_json
  	puts "INDEX"

  	if !@auth_code.blank?
    	@response = HTTParty.post("https://api.napster.com/oauth/access_token",
    		:query => { :client_id => ENV['NAPSTER_KEY'],
						:client_secret => ENV['NAPSTER_SECRET'],
						:response_type => "code",
						:grant_type => "authorization_code",
						:redirect_uri => "http://localhost:3000/hello_world",
						:code => @auth_code
					})
    	@access_token = @response['access_token']
    	@refresh_token = @response['refresh_token']
    	@hello_world_props = { access_token: @access_token, refresh_token: @refresh_token }
	else
		@hello_world_props = {}
	end
  end
end
