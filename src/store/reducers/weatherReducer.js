import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isMetric: true,
  currentWeather: null,
  dailyForecasts: null,
  locationName: 'Tel Aviv',
  locationKey: 215854,
  errors: [],
  loading: false,
  isInFavorites: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    //Fetch 5 Day forecast fetch
    case actionTypes.FORECAST_FETCH_START:
      return { ...state, loading: true };

    case actionTypes.FORECAST_FETCH_SUCCESS:
      return { ...state, dailyForecasts: payload.data, loading: false };

    case actionTypes.FORECAST_FETCH_FAIL:
      return {
        ...state,
        errors: state.errors.concat(payload.error),
        loading: false
      };

    //Fetch Current weather
    case actionTypes.CURRENT_WEATHER_FETCH_START:
      return { ...state, loading: true };

    case actionTypes.CURRENT_WEATHER_FETCH_SUCCESS:
      return { ...state, currentWeather: payload.data, loading: false };

    case actionTypes.CURRENT_WEATHER_FETCH_FAIL:
      return {
        ...state,
        errors: state.errors.concat(payload.error),
        loading: false
      };

    //Set locationKey
    case actionTypes.SET_LOCATION_KEY:
      return { ...state, locationKey: payload.locationKey };
    //set location name
    case actionTypes.SET_LOCATION_NAME:
      return { ...state, locationName: payload.locationName };

    //switch between metric and imperial degrees
    case actionTypes.SWITCH_BETWEEN_METRIC_IMPERIAL:
      return {
        ...state,
        isMetric: !state.isMetric
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
