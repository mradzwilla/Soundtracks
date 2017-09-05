import React from 'react';
import ReactDOM from 'react-dom'
import 'napster';

//This component is only used to receive and manage audio controls and returns no display
//Need to build in functions for pausing and fast-forward/rewinding

//Napster will always be ready to play when this mounts.
//DO NOT USE Napster ready listener here
export default class PlayerControlsComponent extends React.Component {
	constructor(props, _railsContext) {
    	super(props);
    	this.state = {}
	};

	componentWillMount(){
	};

	componentDidMount(){

    };

	componentWillReceiveProps(nextProps){
	}

	// shouldComponentUpdate(nextProps, nextState){

	// }

	componentDidUpdate(prevProps, prevState){

	}


    _playSong(songID){
        Napster.player.play(songID);
    };

	render(){
		return (<div>Player Controls here</div>);
	}
}