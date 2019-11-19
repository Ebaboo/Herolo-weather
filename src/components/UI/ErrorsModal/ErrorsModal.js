import React from 'react';
import classes from './ErrorModal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
  let errors = null;
  if (props.children) {
    errors = props.children.map((error, index) => {
      return <li key={index}>{error}</li>;
    });
  }
  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.logError}/>
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}
      >
        <ul>{errors}</ul>
      </div>
    </React.Fragment>
  );
};

export default Modal;
