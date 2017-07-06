import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'
// import 'napster';
import Frame from 'react-frame-component';

export default class NapsterPlayer extends React.Component {
	constructor(props, _railsContext) {
    	super(props);
    	this.getParameters.bind(this)
	};
	shouldComponentUpdate(){
		return false
	}
	componentWillMount(){

		// Napster.player.on('ready', function(e) {
		//     Napster.player.auth();
		// })
		// console.log("End of Napster")
	};
	getParameters() {
	        var query = window.location.search.substring(1);
	        var parameters = {};
	        if (query) {
	          query.split('&').forEach(function(item) {
	            var param = item.split('=');
	            parameters[param[0]] = param[1];
	          });
	        }
	        return parameters;
	      }
	componentDidMount(){
		// var $playerContainer = ReactDOM.findDOMNode(this.refs.player-frame);
		// var $playerFrame = <iframe id="player-frame" width={100} height={100}/>
		// console.log($playerFrame)
		// $playerContainer.append($playerFrame)
		var accessToken = this.props.access_token
		var refreshToken = this.props.refresh_token

		Napster.init({ 
			consumerKey: 'OWIxMjhlY2MtOTA3Yi00NWJiLThiYTktODc3OTNiYTQ4MGU4'
		});
       	Napster.member.set({
				accessToken: accessToken,
				refreshToken: refreshToken
		});
       	Napster.player.auth();
      
        Napster.player.on('ready', function(e) {
			Napster.player.play('Tra.5156528');
		})

    };

	iframe() {
        return {
            __html: '<iframe src="about:blank">Error</iframe>'
        }
    };

	render(){
		//Currently the 'player-frame' is added to the page in the Rails template
		return(
			<div>
            	
            </div>
		)
	}
}