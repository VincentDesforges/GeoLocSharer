import React from 'react';
import { Button } from 'react-native';

const fetchLocation = props => (
  <Button title="Send Report" onPress={props.onGetLocation} />
);

export default fetchLocation;
