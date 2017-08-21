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
		#API will break if pageOffset starts at 0. Fix this eventually
		@pageOffset = params['offset'] ? params['offset'].to_i : rand(0..10)
		@response = []
		@playlistData = []
		@i = 0

		loop do
		@pageOffset += @i
		#API will break if page offset param is 0
		@pageOffsetURL = (@pageOffset == 0 || !@pageOffset) ? "" : "&page=" + @pageOffset.to_s

  		@TMDB_url = 'https://api.themoviedb.org/3/discover/movie?api_key='+ENV['TMDB_KEY']+'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false'+@pageOffsetURL.to_s+'&with_genres='+@genreID
  		@movie_response = HTTParty.get(@TMDB_url)

  		@playlistData.push(*searchNapter(@movie_response))
  		@i += 1
  		@stopLoop = @playlistData.length >= 5

  		break if @stopLoop
		end 
		@playlistData = @playlistData.shuffle
		@response = {
			playlistData: @playlistData,
			offset: @pageOffset
		}
		# puts @response
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
		#Can update this to 2.2 when Napster releases update of player
		# v2.2 uses 'query' while v2.1 uses q
		# @napster = HTTParty.get("http://api.napster.com/v2.2/search?apikey="+ENV['NAPSTER_KEY']+"&query="+@titleURI+"&type=album&per_type_limit=3")
		@napster = HTTParty.get("http://api.napster.com/v2.1/search?apikey="+ENV['NAPSTER_KEY']+"&q="+@titleURI+"&type=album&limit=3")
		if @napster["meta"]["returnedCount"] > 0
			# @napster["search"]["data"]["albums"].each do |album| #v2.2 syntax
			@napster["data"].each do |album|

				begin 
					# Limiting by genre would be nice but ends up being too restrictive since many soundtracks are missing this genre tag
					# if album["links"]["genres"]["ids"].include? "g.246"
					# should probably change string to 'motion picture soundtrack'
					if album["name"].downcase.include? 'soundtrack'
					#if album["name"]
						puts album
 
						#Add other info that needs to be added here
						@trackDataURL = album['links']['tracks']['href'] + "?apikey=" +ENV['NAPSTER_KEY']
						@trackData = HTTParty.get(@trackDataURL)
						@albumImagesURL = album['links']['images']['href'] + "?apikey=" +ENV['NAPSTER_KEY']
						@albumImages = HTTParty.get(@albumImagesURL)
						# puts @albumImages

						@response_object = { albumName: album["name"],
											 albumID: album['id'],
											 movieName: @movie['original_title'],
											 movieID: @movie['id'],
											 movieBackdrop: @movie['backdrop_path'],
											 moviePoster: @movie['poster_path'],
											 movieDesc: @movie['overview'],
											 trackData: @trackData,
											 albumImages: @albumImages
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
