import { StyleSheet, Text, View } from 'react-native';
import FlatButton from './FlatButton';
import React from 'react';
import { Colors } from '../../constants/colors';

function ScenarioButton({ text }) {
  return (
    <FlatButton style={styles.scenarioBtn} textAlign="left">
      {text}
    </FlatButton>
  );
}

const styles = StyleSheet.create({
  scenarioBtn: {
    fontSize: 20,
    textAlign: 'left',
    backgroundColor: Colors.bluePrimary,
    // margin: 8,
    marginVertical: 6,
    paddingVertical: 12,
    borderRadius: 6,
    elevation: 2, // add shadow - android only
    shadowColor: 'black', // add shadow - ios only
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
});

export default ScenarioButton;
