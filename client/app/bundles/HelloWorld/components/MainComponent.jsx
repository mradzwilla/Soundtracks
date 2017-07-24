import PropTypes from 'prop-types';
import React from 'react';
import GenreSelector from './GenreSelector'
import AuthenticationComponent from './AuthenticationComponent'
import axios from 'axios';
import flashDetect from 'flashdetect'
//Logic needs to be:
//1. Render authenticate
//2. Render if Flash is enabled
//3. Render genre selector

//REMEMBER: Napsters 'ready' will only fire once when first enabled. Don't listen with it
export default class MainComponent extends React.Component {
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

  _getMovie(){
    //Poster path http://image.tmdb.org/t/p/w500/
    var url = 'https://api.themoviedb.org/3/movie/550/similar?api_key=3f520052f9edf70597f2da6b1177e7bf&language=en-US&page=1'
    var self = this
    // var url = 'https://api.themoviedb.org/3/movie/550?api_key=3f520052f9edf70597f2da6b1177e7bf'
    axios.get(url)
      .then(function(response){
        //console.log(response.data);
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
  };

  componentWillMount(){
    this._getMovie()
  };

  componentDidMount(){
    if (typeof this.state.access_token != 'undefined' && typeof this.state.refresh_token != 'undefined'){
      this._initializeNapster()
    }
  }

  _initializeNapster(){
      var API_KEY = "OWIxMjhlY2MtOTA3Yi00NWJiLThiYTktODc3OTNiYTQ4MGU4"
      var self = this
      var accessToken = this.state.access_token
      var refreshToken = this.state.refresh_token

      //Initializing will prompt user to enable Flash player
      Napster.init({ consumerKey: API_KEY });

      // Napster.player.ready mainly checking Flash permissions
      if (Napster.player.ready == true){
          //If Napster is ready, set values
          var params = {  accessToken: accessToken,
                          refreshToken: refreshToken}
          Napster.member.set(params);
          self.setState({napsterReady: true})
      } else {
          //Otherwise, wait until it is
          self.setState({napsterReady: false})
          Napster.player.on('ready', function(e) {
            var params = {  accessToken: accessToken,
                            refreshToken: refreshToken}
            Napster.member.set(params);
            self.setState({napsterReady: true})
          })
      }
  };

  render(){
    if (typeof this.state.access_token == 'undefined' || typeof this.state.refresh_token == 'undefined'){
      return (
        <AuthenticationComponent/>
      )
    } else if (this.state.napsterReady == false){
      return (
        <div>Please enable Flash</div>
      )
    } else {
      return (
        <GenreSelector access_token={this.state.access_token} refresh_token={this.state.refresh_token} />
      )
    }
  };

}
