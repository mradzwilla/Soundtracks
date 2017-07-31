import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'
import 'napster';
// Not using these. Need to remove them from project
// import Frame from 'react-frame-component';
// import flashDetect from 'flashdetect'

//Napster will always be ready to play when this mounts.
//DO NOT USE Napster ready listener here
export default class NapsterPlayer extends React.Component {
	constructor(props, _railsContext) {
    	super(props);
    	this.state = {albumID: this.props.playlistData.albumID}
	};

	componentWillMount(){
	};

	componentDidMount(){
		this._getTrack()
    };

	componentWillReceiveProps(nextProps){
	    if (nextProps.playlistData !== this.props.playlistData) {
	      	this.setState({  albumID: nextProps.playlistData.albumID })
	    }
	}

	componentDidUpdate(prevProps, prevState){
		this._getTrack()
	}

    _getTrack(){
		var API_KEY = "OWIxMjhlY2MtOTA3Yi00NWJiLThiYTktODc3OTNiYTQ4MGU4"
		var self = this
		var albumID = this.state.albumID

		Napster.player.pause();

		var songURL = '/albums/'+albumID+'/tracks'
		Napster.api.get(false, songURL, function(data) {
			var allTracks = data.tracks
			var randomIndex = Math.floor(Math.random()*allTracks.length)
			// console.log(allTracks)
			// console.log(randomIndex)
			var randomSong = allTracks[randomIndex];
			// console.log(randomSong)
			// Right now just play the first one until I figure out UI
			var songID = randomSong.id
			// var songID = allTracks[0]['id']
			self._playSong(songID)
		});
		
    };

    _playSong(songID){
        Napster.player.play(songID);
    };

	render(){
			return(
				<div />
			)
	}
}