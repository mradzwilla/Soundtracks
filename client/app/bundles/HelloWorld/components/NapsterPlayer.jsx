import React from 'react';
import ReactDOM from 'react-dom'
import {jQuery as $} from 'jquery';
import axios from 'axios'
//napster.js does not export Napster but assigns it to the window
import 'napster';

export default class NapsterPlayer extends React.Component {
	constructor(props, _railsContext) {
    	super(props);

	};

	componentWillMount(){

		// Napster.player.on('ready', function(e) {
		//     Napster.player.auth();
		// })
		// console.log("End of Napster")
	};

	componentDidMount(){
		//TODO: Need to add nested iframe for Napster player to find
		var playerContainer = ReactDOM.findDOMNode(this.refs.placeholder);
		Napster.init({
  			consumerKey: "OWIxMjhlY2MtOTA3Yi00NWJiLThiYTktODc3OTNiYTQ4MGU4"
  			// player: 
		});
		Napster.member.set({
			accessToken: this.props.access_token,
			refreshToken: this.props.refresh_token
		});
		console.log('NAPSTER')
		console.log(this.props)
	};

	iframe() {
        return {
            __html: this.props.iframe
        }
    };

	render(){
		return(
			<div>
			<div ref="placeholder" />
       		<Iframe src="" height={100} width={100} id="player-frame"/>
        	</div>
		)
	}
}