import React from 'react';
// import NapsterPlayer from './NapsterPlayer';
import MovieOverview from './MovieOverview';
import TrackListComponent from './TrackListComponent';

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
    if (nextProps.posterPalette !== this.props.posterPalette) {
      this.setState({  playlistData: nextProps.playlistData,
        			         posterPalette: nextProps.posterPalette,
                       currentDisplay: 'overview'
        			      })
    }
  }
  componentDidMount(){
    console.log('new carousel')
  }
  _changeDisplayTo(display){
    this.setState({currentDisplay: display})
  }

  _getPosterStyle(palette){
    //Maps color palette to a CSS object
    var style = new Object
    if (typeof palette != 'undefined'){

    var backgroundRGB = palette.darkMuted
    style['backgroundColor'] = "rgb("+ backgroundRGB.join(',') +")"
    style['color2'] = "rgb("+ palette.darkVibrant.join(',') +")"
    style['color3'] = "rgb("+ palette.lightMuted.join(',') +")"
    style['color4'] = "rgb("+ palette.lightVibrant.join(',') +")"
    style['color5'] = "rgb("+ palette.muted.join(',') +")"
    style['color6'] = "rgb("+ palette.vibrant.join(',') +")"

    //Only dynamic/color-related styling set here. Additional styling in CSS

    style['header'] = {
      color: "rgb("+ palette.lightVibrant.join(',') +")",
      textShadow: "2px 2px 0px " + style.color2
    }
    style['trackList'] = {
      color: "rgb("+ palette.lightMuted.join(',') +")",
    }
    style['albumCover'] = {
      boxShadow: "-2px 2px 10px " + style.color2
    }

    }
    return style
  }

  render(){
  	var currentDisplay = this.state.currentDisplay
  	var style = this._getPosterStyle(this.state.posterPalette)
    // var trackDisplay = this.state.currentDisplay == 'trackList' ? true : false
    console.log(this)
    if (currentDisplay == 'overview'){
      return(
        <div className='carouselDisplay'>
          <MovieOverview header={this.state.playlistData.movieName} overview={this.state.playlistData.movieDesc} styleObject={style}/>
          <button onClick={() => this._changeDisplayTo('overview')}>Overview</button>
          <button onClick={() => this._changeDisplayTo('trackList')}>Player</button>
        </div>
        //Three buttons to update display will go here
      )
    } else if (currentDisplay == 'trackList'){
      return(
        <div className='carouselDisplay'>
          <TrackListComponent playlistData={this.state.playlistData} styleObject={style}/>
          <button onClick={() => this._changeDisplayTo('overview')}>Overview</button>
          <button onClick={() => this._changeDisplayTo('trackList')}>Player</button>
        </div>
        //Three buttons to update display will go here
      )
    } else {
      return(
        <div></div>)
    }
  }
}
