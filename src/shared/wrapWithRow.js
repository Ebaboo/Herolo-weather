import React from 'react';
import { Row } from 'react-bootstrap';
export function wrapWithRow(myArray, chunk_size){
  var index = 0;
  var arrayLength = myArray.length;
  var tempArray = [];
  let myChunk = []
  for (index = 0; index < arrayLength; index += chunk_size) {
      myChunk = myArray.slice(index, index+chunk_size);
      // Do something if you want with the group
      tempArray.push(<Row key={index}>{myChunk}</Row>);
  }
  return tempArray;
}