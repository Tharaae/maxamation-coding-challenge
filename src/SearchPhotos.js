import React, { Component } from 'react';
import Photo from './Photo';
import './App.css';
import searchIcon from './icons/search.svg';
import clearIcon from './icons/close.svg';

/*
 * SearchPhotos component is a state component used to search the photos
 * using Flickr APIs.
 * It uses Photo component for every photo item.
 */
class SearchPhotos extends Component {
  state = {
      //the currently searched for keyword
      query: '',
      //the currently selected number of images to display
      imagesPerPage: 2,
      //the current search results array
      photos: []
    };

  /* Updates the current state to re-render accordingly.
   * Invoked when new key word in entered or current keyword is updated.*/
  updateQuery(newQuery) {
    if(newQuery.trim() !== '') { //if trimmed query is not empty
      // update the current query state with the new search term
      this.setState({query: newQuery});
      // get the new search results
      this.getSearchResults(newQuery);
    } else { //if trimmed query is empty
      //clear search results
      this.clearSearch();
    }
  }

  /* Updated number of images displayed according to user selection.
   * It sets the imagesPerPage state to re-render.
   */
  updateImagesPerPage(imagesPerPage) {
    this.setState({imagesPerPage});
  }

  /* Retrieves the serach result images via Flickr APIs,
   * and sets the photos state accordingly to re-render.
   */
  getSearchResults(query) {
    // Flickr Photo Search API URL
    const FlickrPhotoSearchAPI = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=0757bd7079ed877d57a56142d78be578&format=json&nojsoncallback=1';

    // Fetch search results according to the keyword entered
    fetch(`${FlickrPhotoSearchAPI}&text=${query}`)
    .then((response) => {
      if(response.ok) { // if successful Flickr API call
        return response.json();
      } else { // if failed Flickr API call
        console.log('NO_AVAILABLE_DATA');
      };
    }).then((data) => { // process returned data
      // Flickr Photo Info API URL
      const FlickrPhotoInfoAPI = 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=0757bd7079ed877d57a56142d78be578&format=json&nojsoncallback=1';
      // declare array of Promises to fethch info for every photo in the search results
      const photoInfoAPICalls = [];
      // Limit the number of returned photos to maximum 30 photos
      const photosList = data.photos.photo.slice(0, Math.min(data.photos.photo.length, 30));

      // For every photo in the returned list, add the returned promise of
      // fetching Photo Info via Flickr API to the photoInfoAPICalls promises array
      for(const index in photosList) {
        photoInfoAPICalls.push(
          fetch(`${FlickrPhotoInfoAPI}&photo_id=${photosList[index].id}`)
          .then((response) => {
            if(response.ok) { // if successful Flickr API call
              return response.json();
            } else { // if failed Flickr API call
              console.log('NO_AVAILABLE_DATA');
            };
          }).then((info) => { // process data to return required photo and its author
            const photo = info.photo;
            const photoObject = {
              id: photo.id,
              url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
              author: photo.owner.realname !== ''? photo.owner.realname : photo.owner.username
            };
            return photoObject;
          }));

        // Run all promises in the promises array
        // then assign returned array of obects to photos state.
        Promise.all(photoInfoAPICalls)
        .then((photos) => {
          this.setState({photos});
        }).catch(error => {
          console.log(`Error getting photo info: ${error}`)
        });
      };
    }).catch(error => {
      console.log(`Error getting search results: ${error}`)
    });
  }

  /* Clears the search results by reseting component state to re-renders.
   * Invoked when clear button pressed or enered query erased.
   */
  clearSearch() {
    this.setState({
      query: '',
      photos: []
    });
  }

  render() {
    const {query, imagesPerPage, photos} = this.state;

    return (
      <div>
        <div className='search-container'>
          <input
            className='search-photos'
            placeholder='search by city, e.g. Sydney, and result shown per page can be changed'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />

          { query === '' &&
            <button
              className='search-button'
              tabIndex='-1'
              disabled
            >
              <img className='search-icon' src={searchIcon} alt='search' />
            </button>
          }

          { query !== '' &&
            <button
              className='search-button'
            >
              <img
                className='clear-icon'
                src={clearIcon}
                alt='clear search'
                onClick={() => this.clearSearch()}
              />
            </button>
          }
        </div>

        <div className='radio-group'>
          <input
            type='radio'
            name='images-per-page'
            value='2'
            defaultChecked
            onChange={(event) => this.updateImagesPerPage(event.target.value)}
          />2
          <input
            type='radio'
            name='images-per-page'
            value='10'
            onChange={(event) => this.updateImagesPerPage(event.target.value)}
          />10
          <input
            type='radio'
            name='images-per-page'
            value='30'
            onChange={(event) => this.updateImagesPerPage(event.target.value)}
          />30
        </div>

        <div className='photos-container'>
        { query.trim() !== '' && photos.slice(0, imagesPerPage).map((photo) =>
          <Photo
            key={photo.id}
            photo={photo}
          />
        )}
        </div>
      </div>
    );
  }
}

export default SearchPhotos;
