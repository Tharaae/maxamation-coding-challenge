import SearchPhotos from './SearchPhotos'
import './App.css';
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <h3 className='main-title'> Maxamation Interview Code Challenge 2018</h3>
        <SearchPhotos />
      </div>
    );
  }
}

export default App;
