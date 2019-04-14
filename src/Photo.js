import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

/*
 * Photo component is functional/stateless component
 * used to display every photo item in the search results
 * of photo serach
 */
const Photo = (props) => {
    //current photo object is passed as prop from parent SearchPhotos component
    const {photo} = props;

    return (
      <div className='photo-container'>
        <div className='author'>
          <h5>{photo.author}</h5>
        </div>
        <img
          className='photo'
          src={photo.url}
          alt={`submitted by ${photo.author}`}
        />
      </div>
    );
}

// Prop types are checked to ensure that
// the correct types are passed from parent component
Photo.propTypes = {
  photo: PropTypes.object.isRequired
};

export default Photo;
