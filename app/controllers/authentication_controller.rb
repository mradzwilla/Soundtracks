class AuthenticationController < ApplicationController
	protect_from_forgery except: :index
	require 'uri'
	require 'json'

	def index
		puts "Auth CONTROLLER"
		puts params.to_json
		#@auth_code = params["code"]
		@auth_code = "Y2Y0ZTgwMTMtMmY3OS00ZDYzLTlmMDktMGZjNmI4ZTkyNDJi"
		puts @auth_code
		redirect_to index_path(code: @auth_code)
	end
end
