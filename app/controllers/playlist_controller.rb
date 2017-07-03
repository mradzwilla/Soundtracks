class PlaylistController < ApplicationController
require 'uri'

	def index
		# Basically what needs to happen here:
		#1. Accept a genre from the params
		#2. Get a list of movies from TMDB
		#3. Send each of those responses to Napster until a number of matches are found
		#4. Build JSON which contain all of the napster and TMDB data
		#5. Return JSON to React which will render the view

		#TO-DO:
		# Abstract Napster logic to its own function
		# Iterate through movie responses with Napster function to see if album exists
		# If yes, add it to array

		@genreID = params['genre']
		@pageOffset = rand(0..30).to_s
  		@TMDB_url = 'https://api.themoviedb.org/3/discover/movie?api_key='+ENV['TMDB_KEY']+'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page='+@pageOffset+'&with_genres='+@genreID
  		@movie_response = HTTParty.get(@TMDB_url)
		@testMovie = URI.encode("James Bond")

		#The response hash needs to contain all information needed by UI to play/display 5 tracks
		@response = {}

		# loop do 
  # 		# This is where the Napster function is called on the movie response
  # 		break if @response.length >= 5
		# end 

		#Napster g.246 is the ID for the soundtrack genre
		@napster = HTTParty.get("http://api.napster.com/v2.2/search?apikey="+ENV['NAPSTER_KEY']+"&query="+@testMovie+"&type=album&per_type_limit=5&pretty=true")

		# 
		if @napster["meta"]["returnedCount"] > 0
			@napster["search"]["data"]["albums"].each do |album|
				if album["links"]["genres"]["ids"].include? "g.246"
					puts "This soundtrack title is "+ album["name"]
				end
			end
		end

		respond_to do |format|
      		format.json { render json: @movie_response }
    	end
	end
end
