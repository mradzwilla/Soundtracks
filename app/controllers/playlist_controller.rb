class PlaylistController < ApplicationController

	def index
		@test = {"this is": "a test"}
		puts "HELLLLLLLLOOOOOO"
		respond_to do |format|
      		format.json { render json: @test }
    	end
	end
end
