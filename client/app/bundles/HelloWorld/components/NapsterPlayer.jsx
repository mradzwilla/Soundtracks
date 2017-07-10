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
    	this.getParameters.bind(this)
	};
	shouldComponentUpdate(){
		return false
	}
	componentWillMount(){
		var flashState = this._checkFlash() ? true : false;
		console.log(flashState)
    	this.setState({flash: flashState})
		// Napster.player.on('ready', function(e) {
		//     Napster.player.auth();
		// })
		// console.log("End of Napster")
	};

	_checkFlash(){
	    if (flashDetect.getFlashVersion() > 0){
	      return true
	    } else{
	      return false
	    }
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
		var accessToken = this.props.access_token
		var refreshToken = this.props.refresh_token
		var API_KEY = "OWIxMjhlY2MtOTA3Yi00NWJiLThiYTktODc3OTNiYTQ4MGU4"

        var currentTrack;
        Napster.init({ consumerKey: API_KEY});

        Napster.player.on('ready', function(e) {
	        var params = {	accessToken: accessToken,
	          				refreshToken: refreshToken}
	        if (params.accessToken) {
	            Napster.member.set(params);
	        }
        	Napster.player.play('Tra.5156528');
      	});

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