import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios'
export default class HelloWorld extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(props, _railsContext) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { name: this.props.name };
    this._getMovie.bind(this)
  }

  updateName = (name) => {
    this.setState({ name });
  };

  _getMovie(){
    axios.get('https://api.themoviedb.org/3/movie/550?api_key=3f520052f9edf70597f2da6b1177e7bf')
      .then(function(response){
        console.log(response)
        console.log(response.data); // ex.: { user: 'Your User'}
        console.log(response.status); // ex.: 200
      })

  }
  componentWillMount(){
    this._getMovie()
  };
  render() {
    return (
      <div>
        <h3>
          Hello, {this.state.name}!
        </h3>
        <hr />
        <form >
          <label htmlFor="name">
            Say hello to:
          </label>
          <input
            id="name"
            type="text"
            value={this.state.name}
            onChange={(e) => this.updateName(e.target.value)}
          />
        </form>
      </div>
    );
  }
}
