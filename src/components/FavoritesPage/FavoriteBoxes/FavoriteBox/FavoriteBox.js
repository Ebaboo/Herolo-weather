import React from 'react';
import classes from './FavoriteBox.module.css';
import { BASE_URL } from '../../../../shared/URLS';
import { extractCityName } from '../../../../shared/extractCityName';
import { extractLocationKey } from '../../../../shared/extractLocationKey';

const FavoriteBox = props => {
  const tempValue = props.isMetric ? (
    <p className={classes.TempValue}>
      {Math.round(props.boxInfo.Temperature['Metric'].Value)} &#176;C
    </p>
  ) : (
    <p className={classes.TempValue}>
      {Math.round(props.boxInfo.Temperature['Imperial'].Value)} &#176;F
    </p>
  );

  const locationName = extractCityName(props.boxInfo.Link);
  const locationKey = extractLocationKey(props.boxInfo.Link);

  return (
    <div className={classes.FavoriteBox}>
      <div
        className={classes.HeartIcon}
        onClick={() => props.removeFromFavorites(props.boxInfo.Link)}
      >
        <span className={classes.TooltipText}>Remove From Favorites</span>
        <img src={BASE_URL + '/icons/love-icon.png'} alt='loveIcon' />
      </div>
      <div className={classes.FavoriteInfo}>
        <p
          onClick={() =>
            props.onPickFavoriteLocation(locationKey, locationName)
          }
          className={classes.FavoriteCityName}
        >
          {locationName}
        </p>
        <div className={classes.FavoritesWeatherIcon}>
          <img
            src={BASE_URL + '/icons/' + props.boxInfo.WeatherIcon + '.png'}
            alt='loveIcon'
          />
        </div>
        {tempValue}
        <p className={classes.FavoriteWeatherText}>
          {props.boxInfo.WeatherText}
        </p>
      </div>
    </div>
  );
};

export default FavoriteBox;
