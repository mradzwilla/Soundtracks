import PropTypes from 'prop-types';
import React from 'react';
import NapsterPlayer from './NapsterPlayer';

export default class CurrentTrackComponent extends React.Component {
  static propTypes = {
    // name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  constructor(props, _railsContext) {
    super(props);

    // How to set initial state in ES6 class syntax
	// Image endpoint prefix is https://image.tmdb.org/t/p/w500/
	this.state = { playlistData: this.props.playlistData,
				   backdropPath: this.props.playlistData.movieBackdrop,
                   movieTitle: this.props.playlistData.movieName,
                   albumTitle: this.props.playlistData.albumName,
                   overview: this.props.playlistData.movieDesc,
                   posterPath: this.props.playlistData.moviePoster,
                   //releaseDate: this.props.playlistData.release_date
                };
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.playlistData !== this.props.playlistData) {
      this.setState({  playlistData: nextProps.playlistData,
      				   backdropPath: nextProps.playlistData.movieBackdrop,
	                   movieTitle: nextProps.playlistData.movieName,
	                   albumTitle: nextProps.playlistData.albumName,
	                   overview: nextProps.playlistData.movieDesc,
	                   posterPath: nextProps.playlistData.moviePoster, })
    }
  }

  render(){
  	var backgroundImage = {
    backgroundImage: "url(https://image.tmdb.org/t/p/original/" + this.state.backdropPath,
 	};
 	var poster = 'https://image.tmdb.org/t/p/original/' + this.state.posterPath

  	return(	<div style={backgroundImage}>
  				<h1>{this.state.movieTitle}</h1>
  				<p>{this.state.overview}</p>
  				<img src={poster}/>
  				<NapsterPlayer access_token={this.state.access_token} refresh_token={this.state.refresh_token} playlistData={this.state.playlistData}/>
  			</div>)
  }
}