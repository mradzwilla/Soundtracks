import React from 'react';
import axios from 'axios';
import Napster from 'napster';
import NapsterPlayer from './NapsterPlayer';

//The endpoint below provides the id's for the TMDB genres
//https://api.themoviedb.org/3/genre/movie/list?api_key=3f520052f9edf70597f2da6b1177e7bf&language=en-US
export default class GenreSelector extends React.Component {
	constructor(props, _railsContext) {
	    super(props);
		  this.state = { genre: "none" };
	    // How to set initial state in ES6 class syntax
	    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
  		this._genreSelected.bind(this)
  		this._getMoviesFromGenre.bind(this)
  	};
  	componentWillMount(){
  		this.setState({})
  	}
  	_genreSelected(selection){
  		console.log(selection)
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
  		//Assuming there will be at least 50 pages of results for each.
  		//TODO: Building additional error handling to increase max number
  		var url = 'https://api.themoviedb.org/3/discover/movie?api_key=3f520052f9edf70597f2da6b1177e7bf&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page='+pageOffset+'&with_genres='+genreID
  		var self = this

      axios.get('/playlist', {
        params: {
          "genre": genreID
        }
      })
      .then(function(response){
        console.log(response.data)
        console.log('My API above here')
      })
  		// axios.get(url)
  		// 	.then(function(response){
  		// 		console.log(response.data); // ex.: { user: 'Your User'}
    //     		console.log(response.status); // ex.: 200

    //     		//Add movies to array
    //     		var arrayOffset = Math.floor(Math.random() * 15)
    //     		var moviesOptions = []
    //     		var i;

    //     		for (i=0;i<5;i++){
    //     			var movie = {
    //     				title: response.data.results[i].original_title,
    //     				poster: response.data.results[i].poster_path,
    //     				descritpion: response.data.results[i].overview,
    //     			}
    //     			moviesOptions.push(movie)
    //     		}
    //     		console.log(moviesOptions)
    //     		self.setState({moviesOptions})
    //     		console.log(self.state)
  		// 	})
  	};
  	render(){
  		if (this.state.genre == "none"){
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
		  			<button onClick={() => {this._genreSelected("horror")}}>
	  					Horror
					</button>
		  			<button onClick={() => {this._genreSelected("fantasy")}}>
	  					Fantasy
					</button>
				</div>
	  		)
  		} else {
  			return(
          <NapsterPlayer/>
	  		)
  		}
  	}
}

//To-do: Abstracting buttons to their own component might be good