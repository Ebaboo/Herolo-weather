import * as actionTypes from './actionTypes';
import axios from '../../axios-weather';
import { BASE_WEATHER_URL, MY_WEATHER_API_KEY } from '../../shared/URLS';

//remove error
export const removeShownErrors = () => {
  const data = {
    type: actionTypes.REMOVE_SHOWN_ERROR,
    payload: {}
  };
  return dispatch => {
    dispatch(data);
  };
};

// add error handler to requests outside the action.js (here for inputSearch)
export const customErrorHandler = (errorMessage) => {
  const data = {
    type: actionTypes.CUSTOM_ERROR_EVENT_HANDLER,
    payload: {
      error: errorMessage
    }
  };
  return dispatch => {
    dispatch(data);
  };
};

//set chosen location name
export const setLocationName = locationName => {
  const data = {
    type: actionTypes.SET_LOCATION_NAME,
    payload: {
      locationName: locationName
    }
  };
  return dispatch => {
    dispatch(data);
  };
};

//set chosen location key
export const setLocationKey = locationKey => {
  const data = {
    type: actionTypes.SET_LOCATION_KEY,
    payload: {
      locationKey: locationKey
    }
  };
  return dispatch => {
    dispatch(data);
  };
};

//switch between metric and imperial
export const swithBetweenMetricImperial = () => {
  const data = {
    type: actionTypes.SWITCH_BETWEEN_METRIC_IMPERIAL,
    payload: {}
  };
  return dispatch => {
    dispatch(data);
  };
};

//fetch 5 day forecast
export const forecastFetchStart = payload => ({
  type: actionTypes.FORECAST_FETCH_START,
  payload
});

export const forecastFetchSuccess = data => ({
  type: actionTypes.FORECAST_FETCH_SUCCESS,
  payload: {
    data: data.DailyForecasts
  }
});

export const forecastFetchFail = error => ({
  type: actionTypes.FORECAST_FETCH_FAIL,
  payload: {
    error: error
  }
});

export const forecastFetch = (locationKey, isMetric) => {
  return async dispatch => {
    dispatch(forecastFetchStart());
    try {
      const response = await axios.get(
        'forecasts/v1/daily/5day/' + locationKey,
        {
          params: {
            apikey: MY_WEATHER_API_KEY,
            metric: isMetric,
            details: true
          }
        }
      );
      dispatch(forecastFetchSuccess(response.data));
    } catch (error) {
      dispatch(
        forecastFetchFail(BASE_WEATHER_URL + 'forecasts/v1/daily/5day/ - ' + error)
      );
    }
  };
};

//fetch current weather
export const currentWeatherFetchStart = payload => ({
  type: actionTypes.CURRENT_WEATHER_FETCH_START,
  payload
});

export const currentWeatherFetchSuccess = data => ({
  type: actionTypes.CURRENT_WEATHER_FETCH_SUCCESS,
  payload: {
    data: data
  }
});

export const currentWeatherFetchFail = error => ({
  type: actionTypes.CURRENT_WEATHER_FETCH_FAIL,
  payload: {
    error: error
  }
});

export const currentWeatherFetch = locationKey => {
  return async dispatch => {
    dispatch(currentWeatherFetchStart());
    try {
      const response = await axios.get('/currentconditions/v1/' + locationKey, {
        params: {
          apikey: MY_WEATHER_API_KEY,
          metric: true
        }
      });
      dispatch(currentWeatherFetchSuccess(response.data[0]));
    } catch (error) {
      dispatch(
        currentWeatherFetchFail(
          BASE_WEATHER_URL + '/currentconditions/v1/ - ' + error.message
        )
      );
    }
  };
};
