import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'
import 'napster';
// import Frame from 'react-frame-component';
import flashDetect from 'flashdetect'

//Code is messy right now. Now, Napster will always be ready to play when this mounts.
//DO NOT USE Napster ready listener here
export default class NapsterPlayer extends React.Component {
	constructor(props, _railsContext) {
    	super(props);
    	this.state = {albumID: this.props.playlistData.albumID}
    	// this.getParameters.bind(this)
    	// this.componentDidMount.bind(this)
    	// this._play.bind(this)
	};

	componentWillMount(){
	};

	componentDidMount(){
		this._getTrack()
		//Create setTimeout with playback song length?
    };

	componentWillReceiveProps(nextProps){
	    if (nextProps.playlistData !== this.props.playlistData) {
	      this.setState({  albumID: nextProps.playlistData.albumID })
	    }
	}

	componentDidUpdate(prevProps, prevState){
		console.log(this.props)
		console.log('NapsterUPDATE')
		this._getTrack()
	}

    _getTrack(){
		var API_KEY = "OWIxMjhlY2MtOTA3Yi00NWJiLThiYTktODc3OTNiYTQ4MGU4"
		var self = this
		var albumID = this.state.albumID
		console.log(albumID)
        var currentTrack;

		var songURL = '/albums/'+albumID+'/tracks'
		Napster.api.get(false, songURL, function(data) {
			var allTracks = data.tracks
			var randomSong = allTracks[Math.floor(Math.random()*allTracks.length)];
			console.log(randomSong)
			// Right now just play the first one until I figure out UI
			// var songID = randomSong.id
			var songID = allTracks[0]['id']
			self._playSong(songID)
		});
		
    };

    _playSong(songID){
    	var accessToken = this.props.access_token
		var refreshToken = this.props.refresh_token

        Napster.player.play(songID);
    };

	render(){
			return(
				<div />
			)
	}
}