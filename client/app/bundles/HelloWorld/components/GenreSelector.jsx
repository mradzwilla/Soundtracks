import React from 'react';
import axios from 'axios';
import NapsterPlayer from './NapsterPlayer';
import CurrentTrackComponent from './CurrentTrackComponent';
import PlayedTrackComponent from './PlayedTrackComponent';

//The endpoint below provides the id's for the TMDB genres
//https://api.themoviedb.org/3/genre/movie/list?api_key=3f520052f9edf70597f2da6b1177e7bf&language=en-US
export default class GenreSelector extends React.Component {
	constructor(props, _railsContext) {
	    super(props);
		  this.state = {  access_token: this.props.access_token, 
                      refresh_token: this.props.refresh_token,
                      genre: "none",
                      playedAlbums: [],
                      albumIndex: 0,
                      playlistData: []
                    };
	    // How to set initial state in ES6 class syntax
	    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
  		this._genreSelected.bind(this)
  		this._getMoviesFromGenre.bind(this)
      this._albumForward.bind(this)
  	};
  	componentWillMount(){
  	}
    componentDidMount(){
     var self = this
     //Play next track if current track finishes
     Napster.player.on('playevent', function(e) {
        if (e.data.code == 'PlayComplete'){
          self._albumForward()
        }
      });
    }
    componentDidUpdate(){
      console.log(this.state)
    }
  	_genreSelected(selection){
  		var genreDictionary = {
  			comedy: 35,
  			drama: 18,
  			romance: 10749,
  			action: 28,
  			horror: 27,
  			fantasy: 14,
  		}
  		var genreID = genreDictionary[selection]
  		this.setState({genre: genreID})
  		this._getMoviesFromGenre(genreID)
  	};

  	_getMoviesFromGenre(id, offset){
  		var genreID = id
  		var pageOffset = offset
      console.log('GET MOVIES OFFSET: ' + pageOffset)
      var self = this

      axios.get('/playlist', {
        params: {
          "genre": genreID,
          "offset": pageOffset
        }
      })
      .then(function(response){
        console.log(response.data)
        console.log(response.data.offset)
        console.log('My API above here')
        var newAlbumData = self.state.playlistData
        console.log(newAlbumData)
        response.data.playlistData.map(function(album){
          newAlbumData.push(album)
        })
                console.log(newAlbumData)
        self.setState({playlistData: newAlbumData,
                      offset: response.data.offset })
      })
  	};

    _albumForward(){
      var currentIndex = this.state.albumIndex
      var newIndex = currentIndex + 1
      var playedAlbums = this.state.playedAlbums
      var currentAlbum = this.state.playlistData[currentIndex]

      playedAlbums.unshift(currentAlbum)
      this.setState({albumIndex: newIndex,
                     playedAlbums: playedAlbums},
                     function(){
                      if (this.state.albumIndex == this.state.playlistData.length - 2){
                        console.log('GET MOAR')
                        //Add one to offset for new results
                        this._getMoviesFromGenre(this.state.genre, this.state.offset + 1)
                      }
                     })

    }
    //Will need to return a currently playing component and a history component
  	render(){      
  		if (this.state.genre == "none" || this.state.playlistData.length == 0 ){
	  		return(
	  			<div>
		  		<button onClick={() => {this._genreSelected("comedy")}}>
	  					Comedy
					</button>
		  		<button onClick={() => {this._genreSelected("drama")}}>
	  					Drama
					</button>
		  		<button onClick={() => {this._genreSelected("romance")}}>
	  					Romance
					</button>
		  		<button onClick={() => {this._genreSelected("action")}}>
	  					Action
					</button>
		  		<button onClick={() => {this._genreSelected("fantasy")}}>
	  					Fantasy
					</button>
				</div>
	  		)
  		} else {
        var currentAlbum = this.state.playlistData[this.state.albumIndex]
        var playedAlbums = this.state.playedAlbums

  			return(
          <div>
          <button onClick={() => {this._albumForward()}}>Next album</button>
          <CurrentTrackComponent playlistData={currentAlbum}/>
          {playedAlbums.map((album) =>
             <PlayedTrackComponent playlistData={album} key={album.movieID}/>
          )}

          </div>
        )
  		}
  	}
}

//To-do: Abstracting buttons to their own component might be good