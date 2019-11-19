import * as actionTypes from './actionTypes';
import axios from '../../axios-weather';
import { BASE_WEATHER_URL, MY_WEATHER_API_KEY } from '../../shared/URLS';
import { extractLocationKey } from '../../shared/extractLocationKey';

//check if user already have favorite locations
export const checkIfInFavoriteLocations = locationKey => {
  let favoriteLocations = [];
  let data = {
    type: actionTypes.CHECK_FAVOTIRE_LOCATIONS,
    payload: {
      favoriteLocations: null,
      isInFavorites: false
    }
  };
  if (localStorage.getItem('favotireLocations')) {
    favoriteLocations = JSON.parse(localStorage.getItem('favotireLocations'));
    if (favoriteLocations instanceof Array) {
      if (favoriteLocations.includes(locationKey)) {
        data.payload.isInFavorites = true;
      } else {
        data.payload.isInFavorites = false;
      }
    }
  }
  return dispatch => {
    dispatch(data);
  };
};


//add item to favorite locations
export const addFavoriteLocation = locationKey => {
  let favoriteLocations = [];
  let data = {
    type: actionTypes.ADD_FAVOTIRE_LOCATIONS,
    payload: {
      isInFavorites: false,
      favoriteLocations: null
    }
  };
  if (locationKey) {
    if (localStorage.getItem('favotireLocations')) {
      favoriteLocations = JSON.parse(localStorage.getItem('favotireLocations'));
      if (favoriteLocations instanceof Array) {
        if (favoriteLocations.includes(locationKey)) {
          data.payload.isInFavorites = true;
        } else {
          favoriteLocations.push(locationKey);
          localStorage.setItem(
            'favotireLocations',
            JSON.stringify(favoriteLocations)
          );
          data.payload.isInFavorites = true;
        }
      }
    } else {
      favoriteLocations.push(locationKey);
      localStorage.setItem(
        'favotireLocations',
        JSON.stringify(favoriteLocations)
      );
      data.payload.isInFavorites = true;
    }
  }
  return dispatch => {
    dispatch(data);
  };
};

export const favoriteLocationsFetchStart = payload => ({
  type: actionTypes.FAVORITES_WEATHER_FETCH_START,
  payload
});

export const favoriteLocationsFetchSuccess = favoriteLocations => ({
  type: actionTypes.FAVORITES_WEATHER_FETCH_SUCCESS,
  payload: {
    favoriteLocations: favoriteLocations
  }
});

export const favoriteLocationsFetchFail = error => ({
  type: actionTypes.FAVORITES_WEATHER_FETCH_FAIL,
  payload: {
    error: error
  }
});

export const favoriteLocationsFetch = () => {
  return async dispatch => {
    dispatch(favoriteLocationsFetchStart());
    let fetchQuery = [];
    const favorites = JSON.parse(localStorage.getItem('favotireLocations'));
      if (favorites instanceof Array) {
        fetchQuery = await Promise.all(
          favorites.map(locationKey => {
            return axios
              .get('/currentconditions/v1/' + locationKey, {
                params: {
                  apikey: MY_WEATHER_API_KEY,
                  metric: true
                }
              })
              .catch(e => BASE_WEATHER_URL + '/currentconditions/v1/' + locationKey + ' ' + e.message);
          })
        );
      }
    const favoriteLocations = fetchQuery.filter(el =>
      el.hasOwnProperty('data')
    );
    const errors = fetchQuery.filter(el => typeof el === 'string');
    dispatch(favoriteLocationsFetchSuccess(favoriteLocations));
    dispatch(favoriteLocationsFetchFail(errors));
  };
};


//remove from favorites
export const removeFromFavorites = locationLink => {
  const favorites = JSON.parse(localStorage.getItem('favotireLocations'));
  const locationKey = extractLocationKey(locationLink);
  favorites.splice( favorites.indexOf(locationKey.toString()), 1 );
  localStorage.setItem(
    'favotireLocations',
    JSON.stringify(favorites)
  );
  return async dispatch => {
    dispatch(favoriteLocationsFetchStart());
    let fetchQuery = [];
    const favorites = JSON.parse(localStorage.getItem('favotireLocations'));
      if (favorites instanceof Array) {
        fetchQuery = await Promise.all(
          favorites.map(locationKey => {
            return axios
              .get('/currentconditions/v1/' + locationKey, {
                params: {
                  apikey: MY_WEATHER_API_KEY,
                  metric: true
                }
              })
              .catch(e => BASE_WEATHER_URL + '/currentconditions/v1/' + locationKey + ' ' + e.message);
          })
        );
      }
    // const favorites = [
    //   'favorite1.json',
    //   'favorite2.json',
    //   'favorite3.json',
    //   'favorite1.json',
    //   'favorite2.json',
    //   'favorite3.json',
    //   'favorite1.json',
    // ];
    // fetchQuery = await Promise.all(
    //   favorites.map(locationKey => {
    //     return axios
    //       .get('http://localhost:3000/' + locationKey)
    //       .catch(e => BASE_WEATHER_URL + '/currentconditions/v1/' + locationKey + ' ' + e.message);
    //   })
    // );
    const favoriteLocations = fetchQuery.filter(el =>
      el.hasOwnProperty('data')
    );
    const errors = fetchQuery.filter(el => typeof el === 'string');
    dispatch(favoriteLocationsFetchSuccess(favoriteLocations));
    dispatch(favoriteLocationsFetchFail(errors));
  };
};