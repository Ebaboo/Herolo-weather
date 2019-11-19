import React from 'react';
import classes from './FavoriteBoxes.module.css';
import FavoriteBox from './FavoriteBox/FavoriteBox';
import { Col } from 'react-bootstrap';
import { wrapWithRow } from '../../../shared/wrapWithRow';

const FavoriteBoxes = props => {
  const favoriteBox = props.favoriteInfo.map((box, index) => (
    <Col xs={12} sm={6} lg={3} className={classes.Col} key={index}>
      <FavoriteBox
        boxInfo={box.data[0]}
        isMetric={props.isMetric}
        removeFromFavorites={props.removeFromFavorites}
        onPickFavoriteLocation={props.onPickFavoriteLocation}
      />
    </Col>
  ));

  const updatedFavoriteBoxes = wrapWithRow(favoriteBox, 4);
  return (
    <div className={classes.FavoriteContentWrapper}>
      <h4>My Favorites</h4>
      {updatedFavoriteBoxes}
    </div>
  );
};

export default FavoriteBoxes;
