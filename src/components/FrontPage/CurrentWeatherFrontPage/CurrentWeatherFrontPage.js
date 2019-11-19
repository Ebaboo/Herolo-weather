import React from 'react';
import classes from './CurrentWeatherFrontPage.module.css';
import { BASE_URL } from '../../../shared/URLS';

const CurrentWeatherFrontPage = props => {
  const tempValue = props.isMetric ? (
    <p className={classes.CurrentTemp}>
      {Math.round(props.currentWeatherInfo.Temperature['Metric'].Value) } &#176;C
    </p>
  ) : (
    <p className={classes.CurrentTemp}>
      {Math.round(props.currentWeatherInfo.Temperature['Imperial'].Value) } &#176;F
    </p>
  );
  return (
    <div className={classes.CurrentWrapper}>
      <img
        src={
          BASE_URL + '/icons/' + props.currentWeatherInfo.WeatherIcon + '.png'
        }
        alt='weatherIcon'
      />
      <div className={classes.CurrentText}>
        <p className={classes.CurrentName}>{props.locationName}</p>
          {tempValue}
        <p className={classes.CurrentWeatherText}>{props.currentWeatherInfo.WeatherText}</p>
      </div>
    </div>
  );
};

export default CurrentWeatherFrontPage;
