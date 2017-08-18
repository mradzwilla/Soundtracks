import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'
import 'napster';

//This component is only used to receive and manage audio controls and returns no display
//Need to build in functions for pausing and fast-forward/rewinding

//Napster will always be ready to play when this mounts.
//DO NOT USE Napster ready listener here
export default class NapsterPlayer extends React.Component {
	constructor(props, _railsContext) {
    	super(props);
    	this.state = {trackID: this.props.trackID}
    	this.render.bind(this)
    	this._renderItem.bind(this)
	};

	componentWillMount(){
		// this._getTrack()
	};

	componentDidMount(){
		console.log(this)
		var trackID = this.state.trackID
		this._playSong(trackID)

		// console.log('componentDidMount')
		// this._getTrack()
    };

	componentWillReceiveProps(nextProps){
	    // if (nextProps.playlistData !== this.props.playlistData) {
	    //   	this.setState({  albumID: nextProps.playlistData.albumID,
	    //   					 tracks: []
	    //   	})
	    // }
	}

	// shouldComponentUpdate(nextProps){
	// 	if (nextProps.trackID != this.state.trackID){
	// 		return true
	// 	}
	// }

	componentDidUpdate(prevProps, prevState){
		// console.log(this.state.albumID)
		// console.log(prevState.albumID)
		if (this.state.trackID != prevState.trackID){
			this._playSong(this.state.trackID)
		}
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
			var randomSong = allTracks[randomIndex];
			var songID = randomSong.id

			self.setState({tracks: allTracks,
						   currentIndex: randomIndex
						})
			self._playSong(songID)
		});
		
    };

    _playSong(songID){
        Napster.player.play(songID);
    };

    _renderItem(index, key) {
    	return <div className="trackItem" key={key}>{this.state.tracks[index].name + 'YOLOLOL'}</div>;
  	}

	render(){
		return (null);
	}
}