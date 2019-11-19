import React from 'react';
import classes from './SuggestionListItem.module.css';

const SuggestionListItem = props => {
  const classesArr = [
    classes.Item,
    props.cursor === props.index ? classes.Active : ''
  ];
  return (
    <div
      className={classesArr.join(' ')}
      onClick={() => {
        props.clicked(props.id, props.children);
      }}
    >
      {props.children}
    </div>
  );
};

export default SuggestionListItem;
