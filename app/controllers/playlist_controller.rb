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
		# Iterate through movie responses with Napster function to see if album exists
		# If yes, add it to array

		@genreID = params['genre']
		#API will break if pageOffset starts at 0
		@pageOffset = rand(1..5)
		puts @pageOffset
  # 		@TMDB_url = 'https://api.themoviedb.org/3/discover/movie?api_key='+ENV['TMDB_KEY']+'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page='+@pageOffset+'&with_genres='+@genreID
  # 		@movie_response = HTTParty.get(@TMDB_url)
  # 		puts @movie_response["title"]
		# @testMovie = URI.encode("James Bond")

		#The response hash needs to contain all information needed by UI to play/display 5 tracks
		@response = []
		@i = 0

		loop do
		@pageOffset += @i
  		@TMDB_url = 'https://api.themoviedb.org/3/discover/movie?api_key='+ENV['TMDB_KEY']+'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page='+@pageOffset.to_s+'&with_genres='+@genreID
  		@movie_response = HTTParty.get(@TMDB_url)

  		@response.push(*searchNapter(@movie_response))
  		@i += 1
  		@stopLoop = @response.length >= 5
  		break if @stopLoop
		end 
		@response = @response.shuffle
		puts @response
		#Napster g.246 is the ID for the soundtrack genre
		# @napster = HTTParty.get("http://api.napster.com/v2.2/search?apikey="+ENV['NAPSTER_KEY']+"&query="+@testMovie+"&type=album&per_type_limit=5&pretty=true")

		respond_to do |format|
      		format.json { render json: @response }
    	end
	end
end

def searchNapter(movies)
	#Accepts the TMDB movie response array and filters those that are on Napster
	@response = []
	@movie_response['results'].each do |movie|
		@movie = movie

		@title = movie['title']
		@titleURI = URI.encode(@title)
		@napster = HTTParty.get("http://api.napster.com/v2.2/search?apikey="+ENV['NAPSTER_KEY']+"&query="+@titleURI+"&type=album&per_type_limit=3")
		puts @napster
		if @napster["meta"]["returnedCount"] > 0
			@napster["search"]["data"]["albums"].each do |album|

				begin 
					# Limiting by genre would be nice but ends up being too restrictive since many soundtracks are missing this genre tag
					# if album["links"]["genres"]["ids"].include? "g.246"
					if album["name"].downcase.include? 'soundtrack'
						#Add other info that needs to be added here
						@response_object = { albumName: album["name"],
											 albumID: album['id'],
											 movieName: @movie['original_title'],
											 movieID: @movie['id'],
											 movieBackdrop: @movie['backdrop_path'],
											 moviePoster: @movie['poster_path'],
											 movieDesc: @movie['overview']
											}
						@response << @response_object
					break
					end
				rescue 
					break
				end
			end
		end
	end
	return @response
end 

def getTrack(albumID)
	#Takes an album ID and returns a track id to play
end 
