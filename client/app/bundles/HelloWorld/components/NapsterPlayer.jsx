import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'
import 'napster';
// import Frame from 'react-frame-component';
import flashDetect from 'flashdetect'

export default class NapsterPlayer extends React.Component {
	constructor(props, _railsContext) {
    	super(props);
    	// this.state = {flash: false}
    	// this.getParameters.bind(this)
    	// this.componentDidMount.bind(this)
    	// this._play.bind(this)
	};

	componentWillMount(){
		var flashState = this._checkFlash() ? true : false;
    	this.setState({flash: flashState})
    	console.log(this.props)
	};

	componentDidMount(){
		var API_KEY = "OWIxMjhlY2MtOTA3Yi00NWJiLThiYTktODc3OTNiYTQ4MGU4"
		var self = this
        var currentTrack;

        Napster.init({ consumerKey: API_KEY});
		Napster.player.on('playevent', function(e) {
		  console.log('Play event')
		  console.log(e.data);
		});
		Napster.player.on('playtimer', function(e) {
		//  console.log('Play timer')
  		// 	console.log(e.data);
		});
		var songID = Napster.api.get(false, '/albums/Alb.54719066/tracks', function(data) {
		  // Napster.player.play(data.tracks[0].id);
		var allTracks = data.tracks
		var randomSong = allTracks[Math.floor(Math.random()*allTracks.length)];
		var songID = randomSong.id
		
		self._playSong(songID)
		  //Create setTimeout with playback song length?
		});
    };
	componentDidUpdate(prevProps, prevState){
		console.log(this.props)
	}

    _getTrack(album){
    };

    _playSong(songID){
    	var accessToken = this.props.access_token
		var refreshToken = this.props.refresh_token

	    Napster.player.on('ready', function(e) {
	        var params = {	accessToken: accessToken,
	          				refreshToken: refreshToken}
	        if (params.accessToken) {
	            Napster.member.set(params);
	        }
        	Napster.player.play(songID);
	     });
    };

	_checkFlash(){
	    if (flashDetect.getFlashVersion() > 0){
	      return true
	    } else{
	      return false
	    }
	};

	render(){
		if (this.state.flash == true){
			return(
				<div> 	Flash stuff
	            </div>
			)
		} else {
			return(
				<div> Pleaseokokokokole flash
	            </div>
			)
		}
	}
}