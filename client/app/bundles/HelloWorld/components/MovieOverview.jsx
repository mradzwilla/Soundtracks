import React from 'react';

export default class MovieOverview extends React.Component {
  constructor(props, _railsContext) {
    super(props);
  	this.state = { header: this.props.header,
                   overview: this.props.overview,
                   style: this.props.styleObject
  				        };
  }

  componentWillReceiveProps(nextProps){
    this.setState({ header:nextProps.header,
                    overview: nextProps.overview,
                    style: nextProps.styleObject
                  })
  }
  render(){
  	return(
  		<div>
        <h1 className="movieTitle" style={this.state.style.header}>{this.state.header}</h1>
        <p>{this.state.overview}</p>
  		</div>
  	)
  }
}
