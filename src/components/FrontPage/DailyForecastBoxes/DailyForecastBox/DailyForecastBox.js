import React from 'react';
import classes from './DailyForecastBox.module.css';
import { BASE_URL } from '../../../../shared/URLS';

const DailyForecastBox = props => {
  return (
    <div className={classes.InsideBox}>
      <div className={classes.TopHalf}>
        <div className={classes.Icon}>
          <img
            src={
              BASE_URL + '/icons/' +
              props.forecastInfo.Day.Icon +
              '.png'
            }
            alt='weatherIcon'
          />
        </div>
        <div className={classes.TempValue}>
          {Math.round(props.forecastInfo.Temperature.Maximum.Value)} &#176;{' '}
          {props.forecastInfo.Temperature.Maximum.Unit}
        </div>
        <div className={classes.IconPhrase}>
          {props.forecastInfo.Day.IconPhrase}
        </div>
      </div>

      <div className={classes.BottomHalf}>
        <div className={classes.Icon}>
          <img
            src={
              BASE_URL + '/icons/' +
              props.forecastInfo.Night.Icon +
              '.png'
            }
            alt='weatherIcon'
          />
        </div>
        <div className={classes.TempValue}>
          {Math.round(props.forecastInfo.Temperature.Minimum.Value)} &#176;{' '}
          {props.forecastInfo.Temperature.Minimum.Unit}
        </div>
        <div className={classes.IconPhrase}>
          {props.forecastInfo.Night.IconPhrase}
        </div>
      </div>
    </div>
  );
};

export default DailyForecastBox;
