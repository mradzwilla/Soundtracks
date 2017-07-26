import React from 'react';

export default class PlayedTrackComponent extends React.Component {
	constructor(props, _railsContext) {
    super(props);
    this.state = { backdropPath: this.props.playlistData.movieBackdrop,
                   movieTitle: this.props.playlistData.movieName,
                   albumTitle: this.props.playlistData.albumName,
                   overview: this.props.playlistData.movieDesc,
                   posterPath: this.props.playlistData.moviePoster,
                   hover: false
               }
	}

	componentDidMount(){
		console.log(this.props)
	}
	render(){
		var backgroundImage = {
	    	backgroundImage: "url(https://image.tmdb.org/t/p/original/" + this.state.backdropPath,
	 	};
		return (
			<div className="playedTrackContainer"style={backgroundImage}> 
				Already played {this.state.movieTitle}
			</div>
		)
	}
}