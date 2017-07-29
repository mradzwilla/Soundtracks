import PropTypes from 'prop-types';
import React from 'react';
import * as Vibrant from 'node-vibrant';
import NapsterPlayer from './NapsterPlayer';

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
                     //releaseDate: this.props.playlistData.release_date
                  };
    this._getPosterColors.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.playlistData !== this.props.playlistData) {
      this.setState({  playlistData: nextProps.playlistData,
        				       backdropPath: nextProps.playlistData.movieBackdrop,
  	                   movieTitle: nextProps.playlistData.movieName,
  	                   albumTitle: nextProps.playlistData.albumName,
  	                   overview: nextProps.playlistData.movieDesc,
  	                   posterPath: nextProps.playlistData.moviePoster, })
      this._getPosterColors(nextProps.playlistData.moviePoster)
    }
  }

  componentDidMount(){
  }

  componentDidUpdate(){
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

  _getPosterStyle(palette){
    //Maps color palette to a CSS object
    var style = {
    }
    console.log("GET STYLE")
    console.log(this)
    console.log(palette)
    if (typeof palette != 'undefined'){

    var backgroundRGB = palette.darkMuted
    style['backgroundColor'] = "rgb("+ backgroundRGB.join(',') +")"
    style['color2'] = "rgb("+ palette.darkVibrant.join(',') +")"
    style['color3'] = "rgb("+ palette.lightMuted.join(',') +")"
    style['color4'] = "rgb("+ palette.lightVibrant.join(',') +")"
    style['color5'] = "rgb("+ palette.muted.join(',') +")"
    style['color6'] = "rgb("+ palette.vibrant.join(',') +")"

    style['header'] = {
      color: "rgb("+ palette.lightVibrant.join(',') +")",
      textShadow: "2px 2px 0px " + style.color2
    }
    console.log(style)

    }
    return style

  }
//<img className="poster" src={poster}/>

  render(){
  	var backgroundImage = {
      backgroundImage: "url(https://image.tmdb.org/t/p/original/" + this.state.backdropPath
   	};
   	var poster = 'https://image.tmdb.org/t/p/original/' + this.state.posterPath
    var palette = this.state.posterPalette
    var style = this._getPosterStyle(palette)
  	return(	<div className='currentTrackContainer' style={backgroundImage}>
          <div className="overlay"/>
  				<div className='movieDescription'>
  				<h1 className="movieTitle" style={style.header}>{this.state.movieTitle}</h1>
  				<p>{this.state.overview}</p>
  				<NapsterPlayer access_token={this.state.access_token} refresh_token={this.state.refresh_token} playlistData={this.state.playlistData}/>
  				</div>
  			</div>
  			)
  }
}