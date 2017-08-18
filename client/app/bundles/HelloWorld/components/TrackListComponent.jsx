import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
import 'napster';
import ReactList from 'react-list';
import NapsterPlayer from './NapsterPlayer';

//This component will call napster and generate and store all playlist information in a scrollable view

//Napster will always be ready to play when this mounts.
//DO NOT USE Napster ready listener here
export default class TrackListComponent extends React.Component {
	constructor(props, _railsContext) {
    	super(props);

    	var allTracks = this.props.playlistData.trackData.tracks
		var randomIndex = this._randomIndex(this.props.playlistData.trackData.tracks)

    	this.state = {albumID: this.props.playlistData.albumID,
    				  tracks: this.props.playlistData.trackData.tracks,
    				  display: this.props.display,
    				  currentIndex: randomIndex
    				}
    	this.render.bind(this)
    	this._renderItem.bind(this)
	};

	componentWillMount(){
		console.log('Track list will mount')
	};

	componentDidMount(){
		console.log('componentDidMount')
		console.log(this)
		//this._getTrack()
    };

	componentWillReceiveProps(nextProps){
	    if (nextProps.playlistData !== this.props.playlistData) {
	      	this.setState({  albumID: nextProps.playlistData.albumID,
	      					 tracks: nextProps.playlistData.trackData
	      	})
	    }
	}

	componentDidUpdate(prevProps, prevState){
		if (this.state.albumID != prevState.albumID){
			//this._getTrack()
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
			//self._playSong(songID)
		});
		
    };

    _playSong(songID){
        Napster.player.play(songID);
    };

    _randomIndex(trackArr){
		return Math.floor(Math.random()*trackArr.length)
    }
    _renderItem(index, key) {
    	return <div className="trackItem" key={key}>{this.state.tracks[index].name + 'YOLOLOL'}</div>;
  	}

	render(){
			console.log(this)
			var tracks = this.state.tracks

			if (this.state.display){
				console.log(this)
				var index = this.state.currentIndex 
				var trackID = tracks[index]['id']
				console.log(trackID)
				return(
					<div style={{overflow: 'auto', maxHeight: 120}}>
			          <ReactList
			          	initialIndex={this.state.currentIndex}
			            itemRenderer={this._renderItem.bind(this)}
			            length={tracks.length}
			            type='uniform'
			          />
			          <NapsterPlayer trackID={trackID}/>
			        </div>
		        )
			} else {
				return(
					<NapsterPlayer trackID={trackID}/>
				)
			}

	}
}