import React from 'react';

export default class AuthenticationComponent extends React.Component {
	constructor(props, _railsContext) {
	    super(props);
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
  	render(){
  		return(
  			<button onClick={() => {this._login()}}>
  			Authenticate with Napster
  			</button>
  		)
  	}
}