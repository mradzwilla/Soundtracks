import React from 'react';
import ReactDOM from 'react-dom'
import {jQuery as $} from 'jquery';
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

	componentDidMount(){
		var playerContainer = ReactDOM.findDOMNode(this.refs.placeholder);

	};

	render(){
		return(
			<div ref="placeholder" />
		)
	}
}