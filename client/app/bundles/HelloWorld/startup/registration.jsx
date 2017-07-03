import ReactOnRails from 'react-on-rails';
import HelloWorld from '../components/HelloWorld';
import GenreSelector from '../components/GenreSelector';
import NapsterPlayer from '../components/NapsterPlayer';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld
});
