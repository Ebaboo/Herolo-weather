import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import FavoriteBoxes from '../../components/FavoritesPage/FavoriteBoxes/FavoriteBoxes';
import Modal from '../../components/UI/ErrorsModal/ErrorsModal';
import classes from './Favorites.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';

class Favorites extends Component {
  componentDidMount() {
    this.props.onFevoritesFetch();
  }

  onPickFavoriteLocation = (locationKey, locationName) => {
    this.props.history.push({
      pathname: '/',
      state: {
        details: {
          locationKey: locationKey,
          locationName: locationName
        }
      }
    });
  };

  render() {
    let favoriteLocations = (
      <CircularProgress size={100} className={classes.Spinner} />
    );

    if (this.props.favoriteLocations && !this.props.loading) {
      if (this.props.favoriteLocations.length > 0) {
        favoriteLocations = (
          <FavoriteBoxes
            favoriteInfo={this.props.favoriteLocations}
            isMetric={this.props.isMetric}
            removeFromFavorites={this.props.onRemoveFromFavorites}
            onPickFavoriteLocation={this.onPickFavoriteLocation}
          />
        );
      } else {
        favoriteLocations = (
          <h4 className={classes.NoLocationChosen}>
            No Favorite locations chosen...
          </h4>
        );
      }
    }

    return (
      <Container>
        <Modal
          show={this.props.errors.length > 0}
          logError={() => this.props.onRemoveShownErrors()}
        >
          {this.props.errors}
        </Modal>
        {favoriteLocations}
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  favoriteLocations: state.favorite.favoriteLocations,
  isMetric: state.weather.isMetric,
  errors: state.favorite.errors,
  loading: state.favorite.loading
});

const mapDispatchToProps = dispatch => {
  return {
    onFevoritesFetch: () => dispatch(actions.favoriteLocationsFetch()),
    onRemoveShownErrors: () => dispatch(actions.removeShownErrors()),
    onRemoveFromFavorites: link => dispatch(actions.removeFromFavorites(link))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
