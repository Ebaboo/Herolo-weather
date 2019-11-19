import React from 'react';
import { Nav } from 'react-bootstrap';
import NavigationItem from './NavigationItem/NavigationItem';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

const NavigationItems = props => {
  return (
    <div>
      <Nav className='mr-auto'>
        <NavigationItem link='/' onExpandClose={props.onExpandClose}>
         <HomeOutlinedIcon variant='outlined'/> Home
        </NavigationItem>
        <NavigationItem link='favorites' onExpandClose={props.onExpandClose}>
        <FavoriteBorderIcon /> My Favorites
        </NavigationItem>
      </Nav>
    </div>
  );
};

export default NavigationItems;
