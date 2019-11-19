import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

const NavigationItem = props => {
  return (
    <NavLink
      className={classes.Item}
      exact
      activeClassName={classes.active}
      to={props.link}
      onClick={() => props.onExpandClose()}
    >
      {props.children}
    </NavLink>
  );
};

export default NavigationItem;
