import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Container } from 'react-bootstrap';
import SearchInput from '../../components/FrontPage/SearchInput/SearchInput';
import DaylyForcastBoxes from '../../components/FrontPage/DailyForecastBoxes/DailyForecastBoxes';
import classes from './FrontPage.module.css';
import CurrentWeatherFrontPage from '../../components/FrontPage/CurrentWeatherFrontPage/CurrentWeatherFrontPage';
import CentralTitle from '../../components/FrontPage/CentralTitle/CentralTitle';
import Modal from '../../components/UI/ErrorsModal/ErrorsModal';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';

class FrontPage extends Component {
  state = {
    pickedCity: ''
  };

  componentDidMount() {
    if (this.props.location.state) {
      this.props.onForecastFetch(
        this.props.location.state.details.locationKey,
        this.props.isMetric
      );
      this.props.onSetLocationName(
        this.props.location.state.details.locationName
      );
      this.props.onSetLocationKey(
        this.props.location.state.details.locationKey
      );
      this.props.onCurrentWeatherFetch(
        this.props.location.state.details.locationKey
      );
      this.setState({
        pickedCity: this.props.location.state.details.locationName
      });
      this.props.history.replace('', null);
    } else {
      this.props.onForecastFetch(this.props.locationKey, this.props.isMetric);
      this.props.onCurrentWeatherFetch(this.props.locationKey);
      this.setState({ pickedCity: this.props.locationName });
    }
  }

  componentDidUpdate() {
    this.props.onCheckIfInFavoriteLocations(this.props.locationKey);
  }

  pickedCityKeyHandler = (locationKey, name) => {
    if (locationKey && name) {
      this.props.onForecastFetch(locationKey, this.props.isMetric);
      this.props.onSetLocationName(name);
      this.props.onSetLocationKey(locationKey);
      this.props.onCurrentWeatherFetch(locationKey);
    }
    this.setState({ pickedCity: name });
  };

  switchBetweenMetricImperial = () => {
    this.props.onSwithBetweenMetricImperial();
    this.props.onForecastFetch(this.props.locationKey, !this.props.isMetric);
  };

  render() {
    let dailyForecastsBox = null;
    let currentWeather = null;
    let favoriteLocationButton = (
      <Button
        startIcon={<FavoriteIcon color="action" />}
        variant='outlined'
        onClick={() => this.props.onAddFavoriteLocation(this.props.locationKey)}
      >
        Add To Favorite
      </Button>
    );
    if (this.props.dailyForecasts) {
      dailyForecastsBox = (
        <DaylyForcastBoxes
          dailyForecasts={this.props.dailyForecasts}
          isMetric={this.props.isMetric}
        />
      );
    }
    if (this.props.currentWeather) {
      currentWeather = (
        <CurrentWeatherFrontPage
          currentWeatherInfo={this.props.currentWeather}
          locationName={this.props.locationName}
          isMetric={this.props.isMetric}
        />
      );
    }
    if (this.props.isInFavorites) {
      favoriteLocationButton = (
        <NavLink to={'/favorites'} className={classes.FavoriteLink}>
          <Button variant='outlined' color='primary'>
            Check out favorite
          </Button>
        </NavLink>
      );
    }

    return (
      <Container>
        <Modal
          show={this.props.errors.length > 0}
          logError={() => this.props.onRemoveShownErrors()}
        >
          {this.props.errors}
        </Modal>
        <SearchInput
          searchInputHandler={this.searchInputHandler}
          cityPickClick={this.pickedCityKeyHandler}
          pickedCity={this.state.pickedCity}
          errorMessageHandler={this.props.onErrorMessageHandler}
        />
        <div className={classes.MainContentWrapper}>
          <div className={classes.CurrentWeatherWrapper}>
            <div>{currentWeather}</div>
            <div className={classes.SwitchButtonContainer}>
              <Button
                variant='contained'
                className={classes.SwitchButton}
                onClick={() => this.switchBetweenMetricImperial()}
              >
                Switch &#176;C / &#176;F
              </Button>
            </div>
            <div>{favoriteLocationButton}</div>
          </div>
          <div className={classes.CentralTitleWrapper}>
            <CentralTitle locationName={this.props.locationName} />
          </div>
          <div className={classes.DailyForecastsWrapper}>
            {dailyForecastsBox}
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  dailyForecasts: state.weather.dailyForecasts,
  currentWeather: state.weather.currentWeather,
  locationName: state.weather.locationName,
  locationKey: state.weather.locationKey,
  isMetric: state.weather.isMetric,
  isInFavorites: state.favorite.isInFavorites,
  errors: state.weather.errors
});

const mapDispatchToProps = dispatch => {
  return {
    onForecastFetch: (locationKey, isMetric) =>
      dispatch(actions.forecastFetch(locationKey, isMetric)),
    onSetLocationName: locationName =>
      dispatch(actions.setLocationName(locationName)),
    onCurrentWeatherFetch: locationKey =>
      dispatch(actions.currentWeatherFetch(locationKey)),
    onSetLocationKey: locationKey =>
      dispatch(actions.setLocationKey(locationKey)),
    onCheckIfInFavoriteLocations: locationKey =>
      dispatch(actions.checkIfInFavoriteLocations(locationKey)),
    onAddFavoriteLocation: locationKey =>
      dispatch(actions.addFavoriteLocation(locationKey)),
    onSwithBetweenMetricImperial: () =>
      dispatch(actions.swithBetweenMetricImperial()),
    onRemoveShownErrors: () => dispatch(actions.removeShownErrors()),
    onErrorMessageHandler: errorMessage =>
      dispatch(actions.customErrorHandler(errorMessage))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage);
