import React from 'react';
import axios from 'axios';
import NapsterPlayer from './NapsterPlayer';
import CurrentTrackComponent from './CurrentTrackComponent';

//The endpoint below provides the id's for the TMDB genres
//https://api.themoviedb.org/3/genre/movie/list?api_key=3f520052f9edf70597f2da6b1177e7bf&language=en-US
export default class GenreSelector extends React.Component {
	constructor(props, _railsContext) {
	    super(props);
		  this.state = {  access_token: this.props.access_token, 
                      refresh_token: this.props.refresh_token,
                      genre: "none",
                      playedAlbums: [],
                      albumIndex: 0
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
     Napster.player.on('playevent', function(e) {
        console.log(e.data);
        if (e.data.code == 'PlayComplete'){
          self._albumForward()
        }
      });
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

  	_getMoviesFromGenre(id){
  		var genreID = id
  		var pageOffset = Math.floor(Math.random() * 10)
      var self = this
  		//Assuming there will be at least 50 pages of results for each.
  		//TODO: Building additional error handling to increase max number

      axios.get('/playlist', {
        params: {
          "genre": genreID
        }
      })
      .then(function(response){
        console.log(response.data)
        console.log('My API above here')
        self.setState({playlistData: response.data})
      })
  	};

    _albumForward(){
      var currentIndex = this.state.albumIndex
      var newIndex = currentIndex + 1
      var playedAlbums = this.state.playedAlbums
      var currentAlbum = this.state.playlistData[currentIndex]

      console.log('New album')
      console.log(newIndex)
      console.log(this.state.playlistData[this.state.albumIndex])
      playedAlbums.push(currentAlbum)
      this.setState({albumIndex: newIndex,
                     playedAlbums: playedAlbums})

    }
    //Will need to return a currently playing component and a history component
  	render(){      
  		if (this.state.genre == "none" || typeof this.state.playlistData == 'undefined'){
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

  			return(
          <div>
          <button onClick={() => {this._albumForward()}}>Next album</button>
          <CurrentTrackComponent playlistData={currentAlbum}/>
          </div>
        )
  		}
  	}
}

//To-do: Abstracting buttons to their own component might be good