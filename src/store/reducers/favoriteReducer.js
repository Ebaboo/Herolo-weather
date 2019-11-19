import * as actionTypes from '../actions/actionTypes';

const initialState = {
  favoriteLocations: null,
  errors: [],
  loading: false,
  isInFavorites: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case actionTypes.CHECK_FAVOTIRE_LOCATIONS:
      return {
        ...state,
        isInFavorites: payload.isInFavorites,
        favoriteLocations: payload.favoriteLocations
      };
    case actionTypes.ADD_FAVOTIRE_LOCATIONS:
      return {
        ...state,
        isInFavorites: payload.isInFavorites,
        favoriteLocations: payload.favoriteLocations
      };
    //fetch favorite reducers
    case actionTypes.FAVORITES_WEATHER_FETCH_START:
      return { ...state, loading: true };

    case actionTypes.FAVORITES_WEATHER_FETCH_SUCCESS:
      return {
        ...state,
        favoriteLocations: payload.favoriteLocations,
        loading: false
      };

    case actionTypes.FAVORITES_WEATHER_FETCH_FAIL:
      return {
        ...state,
        errors: state.errors.concat(payload.error),
        loading: false
      };

    case actionTypes.REMOVE_SHOWN_ERROR:
      return {
        ...state,
        errors: []
      };

    case actionTypes.CUSTOM_ERROR_EVENT_HANDLER:
      return {
        ...state,
        errors: state.errors.concat(payload.error)
      };

    default:
      return state;
  }
};
