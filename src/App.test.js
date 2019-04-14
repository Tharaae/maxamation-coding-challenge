import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SearchPhotos from './SearchPhotos';
import Photo from './Photo';


/* Testing components to be rendering correctly without crashing */
describe ('Rendering', () => {

  // Testing main App component renedering
  it('App renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  // Testing SearchPhotos component rendering
  it('Search Photos Component renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchPhotos />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  // Testing Photo component rendering
  it('Search Photos Component renders without crashing', () => {
    const div = document.createElement('div');

    // passing a sample photo object as photo prop
    const photoObject = {
      id: 'id123',
      author: 'author abc',
      url: 'xyz'
    };
    ReactDOM.render(<Photo photo={photoObject} />, div);

    // passing an empty photo object as photo prop
    const photoEmpty = {};
    ReactDOM.render(<Photo photo={photoEmpty} />, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});
