import React from "react";
import { Row, Col } from "react-bootstrap";
import classes from "./DailyForecastBoxes.module.css";
import DailyForecastBox from './DailyForecastBox/DailyForecastBox';

const DailyForecastBoxes = props => {
  const dailyBoxes = props.dailyForecasts.map((forecastInfo, index) => {
    return (
      <React.Fragment key={index}>
        <Col xs={12} lg sm={4} className={classes.DailyBoxes}>
          <div className={classes.Title}>
            {new Date(forecastInfo.Date).toString().split(" ")[0]}
          </div>
              <DailyForecastBox forecastInfo={forecastInfo} isMetric={props.isMetric} />
        </Col>
      </React.Fragment>
    );
  });
  return <Row>{dailyBoxes}</Row>;
};

export default DailyForecastBoxes;
