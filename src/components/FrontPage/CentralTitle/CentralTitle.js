import React from 'react';
import classes from './CentralTitle.module.css';
import { BASE_URL } from '../../../shared/URLS';

const CentralTitle = (props) => {
  let title = 'Welcome to Current Weather';

  if(props.locationName){
    title = '5-Days Weather in ' + props.locationName
  }
  return (
    <div className={classes.CentralTitleBox} style={{backgroundImage: "url(" + BASE_URL + "/images/clouds.png)"}}>
      <div className={classes.CetralTitle}>
      {title}
      </div>
    </div>
  )
}

export default CentralTitle
