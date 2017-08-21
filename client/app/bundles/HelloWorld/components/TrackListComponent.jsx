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
		console.log("Track LIST")
		console.log(props)
    	this.state = {albumID: this.props.playlistData.albumID,
    				  tracks: this.props.playlistData.trackData.tracks,
    				  currentIndex: randomIndex
    				}
    	this.render.bind(this)
    	this._renderItem.bind(this)
    	this._playSong.bind(this)
	};

	componentWillMount(){
	};

	componentDidMount(){
		var tracks = this.state.tracks
		var index = this.state.currentIndex 
		var trackID = tracks[index]['id']
		// this._playSong(trackID)
    };

	// componentWillReceiveProps(nextProps){
	//     if (nextProps.playlistData !== this.props.playlistData) {
	//       	this.setState({  albumID: nextProps.playlistData.albumID,
	//       					 tracks: nextProps.playlistData.trackData
	//       	})
	//     }
	// }

	componentDidUpdate(prevProps, prevState){
		if (this.state.albumID != prevState.albumID){
			//this._getTrack()
		}
	}

	componentWillUnmount(){
		//Add function to this to add data 
	}

    _playSong(songID){
        Napster.player.play(songID);
    };

    _randomIndex(trackArr){
		return Math.floor(Math.random()*trackArr.length)
    }
    _renderItem(index, key) {
    	var trackNumber = index + 1
    	return <div className="trackItem" style={this.props.styleObject.trackList} key={key} onClick={() => {this._playSong(this.state.tracks[index].id)}}>{trackNumber + ": " +this.state.tracks[index].name}</div>;
  	}

	render(){
			console.log(this)
			var tracks = this.state.tracks
			var style = this.props.styleObject
			return(
				<div>
				<h1 style={this.props.styleObject.header}>{this.props.playlistData.albumName}</h1>
				<img className='albumCover' 
					 style={style.albumCover} 
					 src={this.props.playlistData.albumImages.images[0]['url']}/>
				<div className="trackListContainer" style={{overflow: 'auto', maxHeight: 170}}>
		          <ReactList
		          	initialIndex={this.state.currentIndex}
		            itemRenderer={this._renderItem.bind(this)}
		            length={tracks.length}
		            type='uniform'
		          />
		        </div>
		        </div>
	        )
	}
}