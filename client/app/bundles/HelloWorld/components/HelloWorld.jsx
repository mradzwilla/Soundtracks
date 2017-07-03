import PropTypes from 'prop-types';
import React from 'react';
import GenreSelector from './GenreSelector'
import AuthenticationComponent from './AuthenticationComponent'
import axios from 'axios';

export default class HelloWorld extends React.Component {
  static propTypes = {
    // name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(props, _railsContext) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { access_token: this.props.access_token,
                    refresh_token: this.props.refresh_token };
    this._getMovie.bind(this)
  }

  // updateName = (name) => {
  //   this.setState({ name });
  // };

  _getMovie(){
    //Poster path http://image.tmdb.org/t/p/w500/
    var url = 'https://api.themoviedb.org/3/movie/550/similar?api_key=3f520052f9edf70597f2da6b1177e7bf&language=en-US&page=1'
    var self = this
    // var url = 'https://api.themoviedb.org/3/movie/550?api_key=3f520052f9edf70597f2da6b1177e7bf'
    axios.get(url)
      .then(function(response){
        console.log(response.data); // ex.: { user: 'Your User'}
        console.log(response.status); // ex.: 200
        //Results are paginated so anything above 20 will fail. Would be cool to build on this
        // var maxResults = response.data.total_results
      
        var index = Math.floor(Math.random() * 20)
        var movie = response.data.results[index]
        self.setState({ movieTitle:movie.original_title,
                        movieDescription: movie.overview,
                        moviePoster: movie.poster_path,
                        movieBackdrop: movie.backdrop_path
                      })
      })

  }

  componentWillMount(){
    this._getMovie()
  };

  render() {
    if (this.props.access_token && this.props.refresh_token){
      return (
        <div>
          <h3>
            The movie is {this.state.movieTitle}.
          </h3>
          <p style={{fontSize:12}}>
            {this.state.movieDescription}
          </p>
          <GenreSelector access_token={this.state.access_token} refresh_token={this.state.refresh_token} />
          <hr />
        </div>
      );
    } else {
      return (
        <AuthenticationComponent/>
      )
    }
  }
}
