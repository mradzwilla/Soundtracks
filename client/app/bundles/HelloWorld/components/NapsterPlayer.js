import React from 'react';
window.jQuery = window.$ = require('jquery');
import Napster from 'napster'

export default class HelloWorld extends React.Component {
	constructor(props, _railsContext) {
    	super(props);
	}

	render(){
		<div>
			This is the Napster Player
		</div>
	}
}