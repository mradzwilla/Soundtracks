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
		//There needs to be backend auth here to get oauth access tokens
		Napster.init({
  			consumerKey: "OWIxMjhlY2MtOTA3Yi00NWJiLThiYTktODc3OTNiYTQ4MGU4"
		});
	};

	_authUser(){
	    // window.open("https://api.napster.com/oauth/authorize?client_id=OWIxMjhlY2MtOTA3Yi00NWJiLThiYTktODc3OTNiYTQ4MGU4&redirect_uri=http://www.google.com&response_type=code")
	};

	_login() {

	const napsterAPI = 'https://api.napster.com';
	const APIKEY = 'OWIxMjhlY2MtOTA3Yi00NWJiLThiYTktODc3OTNiYTQ4MGU4';
	const oauthURL = `${napsterAPI}/oauth/authorize?client_id=${APIKEY}&response_type=code`;

	const REDIRECT_URI = 'http://localhost:3000/authentication';
	const width = 700;
	const height = 400;
	const left = (screen.width / 2) - (width / 2);
	const top = (screen.height / 2) - (height / 2);

	window.addEventListener('message',(event) => {
    var hash = JSON.parse(event.data);
    console.log(hash)
  }, false);
 

	window.open(
  	`${oauthURL}&redirect_uri=${REDIRECT_URI}`,
  	'_parent',
    `menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=${width},height=${height},top=${top}, left=${left}`
  );
}
	componentDidMount(){
		var playerContainer = ReactDOM.findDOMNode(this.refs.placeholder);
		this._login()
	};

	render(){
		return(
			<div ref="placeholder" />
		)
	}
}