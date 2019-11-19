import React, { useState } from 'react';
import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = props => {
  const [expanded, setExpanded] = useState(false);

  const onExpandClose = () => {
    setExpanded(false)
  } 
  return (
    <div className={classes.Toolbar}>
      <Navbar
        expanded={expanded}
        bg='light'
        expand='lg'
        variant='light'
        style={{ padding: '0 1rem' }}
      >
        <Navbar.Brand>
          <NavLink to='/'>
            <span className={classes.FirmTitle}>Herolo</span>{' '}
            <span className={classes.BrandTitle}>Current Weather</span>
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle
          onClick={() => setExpanded(expanded ? false : 'expanded')}
          aria-controls='basic-navbar-nav'
        />
        <Navbar.Collapse id='basic-navbar-nav'>
          <span className={classes.Spacer}> </span>
          <NavigationItems onExpandClose={onExpandClose}/>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Toolbar;
