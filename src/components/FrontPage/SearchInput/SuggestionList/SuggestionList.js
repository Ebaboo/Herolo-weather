import React from 'react';
import classes from './SuggestionList.module.css';
import SuggestionListItem from './SuggestionListItem/SuggestionListItem';

const SuggestionList = props => {
  const listItem = props.suggestions.map((item, index) => {
    return (
      <SuggestionListItem
        cursor={props.cursor}
        index={index}
        key={item.Key}
        clicked={props.clicked}
        id={item.Key}
      >
        {item.LocalizedName}
      </SuggestionListItem>
    );
  });
  return <div className={classes.SuggestionListWrapper}>{listItem}</div>;
};

export default SuggestionList;
