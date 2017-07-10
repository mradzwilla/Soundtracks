class AuthenticationController < ApplicationController
	protect_from_forgery except: :index
	require 'uri'
	require 'json'

	def index
		puts "Auth CONTROLLER"
		puts params.to_json
		@auth_code = params["code"]
		# @auth_code = "OTFhMWJlNTItNDVhMC00YzlhLWIzY2EtZmMxNTQ2MTdiYTkz"
		puts @auth_code
		redirect_to index_path(code: @auth_code)
	end
end
