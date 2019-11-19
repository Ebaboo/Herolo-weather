import React, { useState, useEffect } from 'react';
import axios from '../../../axios-weather';
import InputBase from '@material-ui/core/InputBase';
import { Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import classes from './SearchInput.module.css';
import SuggestionList from './SuggestionList/SuggestionList';
import { BASE_WEATHER_URL, MY_WEATHER_API_KEY } from '../../../shared/URLS';

const SearchInput = props => {
  const [currentInputValue, setCurrentInputValue] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [cursor, setCursor] = useState(-1);

  const handleKeyDown = e => {
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 38 && cursor > 0) {
      setCursor(cursor - 1);
    } else if (e.keyCode === 40 && cursor < suggestions.length - 1) {
      setCursor(cursor + 1);
    } else if (e.keyCode === 13) {
      setCursor(-1);
      setSuggestions([]);
      props.cityPickClick(
        suggestions[cursor]['Key'],
        suggestions[cursor]['LocalizedName']
      );
    }
  };

  useEffect(() => {
    if (props.pickedCity) {
      setSuggestions([]);
    }
  }, [props.pickedCity]);

  const onInputHandler = value => {
    const helperValue = value.replace(/[^\x00-\x7F]+/ig, '');
    if (value && helperValue === value) {
      onValueChangeHandler(value);
      setCurrentInputValue(helperValue);
      props.cityPickClick('', '');
    } else {
      setCurrentInputValue(helperValue);
    }
  };

  const onValueChangeHandler = async value => {
    try {
      const response = await axios.get('locations/v1/cities/autocomplete', {
        params: { apikey: MY_WEATHER_API_KEY, q: value }
      });
      if (value) {
        setCursor(-1);
        setSuggestions(response.data);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      props.errorMessageHandler(
        BASE_WEATHER_URL + 'locations/v1/cities/autocomplete - ' + error.message
      );
    }
  };

  return (
    <div className={classes.SearchInput}>
      <Paper className={classes.Paper}>
        <SearchIcon />
        <InputBase
          onKeyDown={handleKeyDown}
          className={classes.InputWrapper}
          placeholder='type city name here...'
          onChange={event => {
            onInputHandler(event.target.value);
          }}
          value={props.pickedCity || currentInputValue}
          mask={/^[a-zA-Z]+$/}
        />
      </Paper>
      {suggestions.length !== 0 ? (
        <SuggestionList
          clicked={props.cityPickClick}
          suggestions={suggestions}
          cursor={cursor}
        />
      ) : null}
    </div>
  );
};

export default SearchInput;
