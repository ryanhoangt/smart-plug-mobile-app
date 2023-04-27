import { StyleSheet, Text, View } from 'react-native';
import FlatButton from './FlatButton';
import React from 'react';
import { Colors } from '../../constants/colors';

function ScenarioButton({ text, onPress }) {
  return (
    <FlatButton style={styles.scenarioBtn} textAlign="left" onPress={onPress}>
      <Text numberOfLines={1} style={styles.text}>{text}</Text>
    </FlatButton>
  );
}

const styles = StyleSheet.create({
  scenarioBtn: {
    fontSize: 2,
    maxWidth: "100%",
    textAlign: 'left',
    backgroundColor: Colors.bluePrimary,
    // margin: 8,
    marginRight: 10,
    marginVertical: 6,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 1, // add shadow - android only
    shadowColor: 'black', // add shadow - ios only
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },

  text: {
    fontSize: 16
  }
});

export default ScenarioButton;
