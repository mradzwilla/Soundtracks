import React from 'react';
import NapsterPlayer from './NapsterPlayer';
import MovieOverview from './MovieOverview';

export default class CarouselDisplay extends React.Component {
  constructor(props, _railsContext) {
    super(props);
  	this.state = { currentDisplay: 'overview',
  				   playlistData: this.props.playlistData,
  				   posterPalette: this.props.posterPalette
  				 };
  	this._changeDisplayTo.bind(this)
  	this._getPosterStyle.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.playlistData !== this.props.playlistData) {
      this.setState({  playlistData: nextProps.playlistData,
        			   currentDisplay: nextProps.overview,
        			   posterPalette: nextProps.posterPalette 
        			})
    }
  }
  componentDidMount(){
  	console.log('DID MOUNT')
  	console.log(this)
  }
  _changeDisplayTo(display){
  	console.log(display)
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

  render(){
  	var currentDisplay = this.state.currentDisplay
  	var style = this._getPosterStyle(this.state.posterPalette)
  	console.log(style)
  	console.log(this)
  	return(
  		<div className='carouselDisplay'>
  		<MovieOverview header={this.state.playlistData.movieName} overview={this.state.playlistData.movieDesc} styleObject={style}/>
  	  	<NapsterPlayer playlistData={this.state.playlistData}/>
  	  	<button onClick={() => this._changeDisplayTo('overview')}>Overview</button>
  	  	<button onClick={() => this._changeDisplayTo('player')}>Player</button>
  		</div>
  		//Three buttons to update display will go here
  	)
  }
}
