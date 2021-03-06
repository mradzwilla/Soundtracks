import PropTypes from 'prop-types';
import React from 'react';
import * as Vibrant from 'node-vibrant';
import CarouselDisplay from './CarouselDisplay';

export default class CurrentTrackComponent extends React.Component {
  static propTypes = {
    // name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  constructor(props, _railsContext) {
    super(props);

    // How to set initial state in ES6 class syntax
  	// Image endpoint prefix is https://image.tmdb.org/t/p/w500/
  	this.state = {   playlistData: this.props.playlistData,
  				           backdropPath: this.props.playlistData.movieBackdrop,
                     movieTitle: this.props.playlistData.movieName,
                     albumTitle: this.props.playlistData.albumName,
                     overview: this.props.playlistData.movieDesc,
                     posterPath: this.props.playlistData.moviePoster,
                     trackData: this.props.playlistData.trackData.tracks,
                     currentDisplay: 'overview'
                     //releaseDate: this.props.playlistData.release_date
                  };
    this._getPosterColors.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.playlistData !== this.props.playlistData) {
      var tracks = nextProps.playlistData.trackData.tracks
      var index = 0
      var trackID = tracks[index]['id']
      this._playSong(trackID)

      this.setState({  playlistData: nextProps.playlistData,
        				       backdropPath: nextProps.playlistData.movieBackdrop,
  	                   movieTitle: nextProps.playlistData.movieName,
  	                   albumTitle: nextProps.playlistData.albumName,
  	                   overview: nextProps.playlistData.movieDesc,
  	                   posterPath: nextProps.playlistData.moviePoster,
                       trackData: nextProps.playlistData.trackData.tracks, })
      this._getPosterColors(nextProps.playlistData.moviePoster)
    }
  }
  componentWillMount(){
    this._getPosterColors(this.props.playlistData.moviePoster)
  }
  componentDidMount(){
    var tracks = this.state.trackData
    console.log(this)
    var index = 0
    var trackID = tracks[index]['id']
    Napster.player.play(trackID);
  }

  componentDidUpdate(){
  }

  componentWillUnmount(){
    Napster.player.pause();
  }
  _getPosterColors(posterPath){
    var poster = 'https://image.tmdb.org/t/p/original/' + posterPath
    var self = this
    Vibrant.from(poster).getPalette((err, palette) => {
      var posterPalette = {
        darkMuted: palette.DarkMuted.getRgb(),
        darkVibrant: palette.DarkVibrant.getRgb(),
        lightMuted: palette.LightMuted.getRgb(),
        lightVibrant: palette.LightVibrant.getRgb(),
        muted: palette.Muted.getRgb(),
        vibrant: palette.Vibrant.getRgb(),
      }
      self.setState({posterPalette})
    })
  }

  _playSong(trackID){
    Napster.player.play(trackID);
  }
//<img className="poster" src={poster}/>

  render(){
  	var backgroundImage = {
      backgroundImage: "url(https://image.tmdb.org/t/p/original/" + this.state.backdropPath
   	};
   	var poster = 'https://image.tmdb.org/t/p/original/' + this.state.posterPath
    var palette = this.state.posterPalette
  	return(	<div className='currentTrackContainer' style={backgroundImage}>
          <div className="overlay"/>
          <CarouselDisplay playlistData={this.state.playlistData} posterPalette={this.state.posterPalette}/>

  			</div>
  			)
  }
}