import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { Colors } from '../../constants/colors';

function DeviceController({ device }) {
  const { id, name, state, topic } = device;
  const [isOn, setIsOn] = useState(state);

  const toggleSwitch = () => {
    setIsOn((prevState) => !prevState);
  };

  return (
    <View style={styles.deviceContainer}>
      <Text numberOfLines={1} style={styles.deviceNameText}>{name}</Text>
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>{isOn ? 'On' : 'Off'}</Text>
        <Switch
          onValueChange={toggleSwitch}
          value={isOn}
          trackColor={{ true: Colors.orangePrimary }}
        />
      </View>
    </View>
  );
}

export default DeviceController;

const styles = StyleSheet.create({
  deviceContainer: {
    backgroundColor: 'white',
    width: '48%',
    borderRadius: 12,
    padding: 8,
    elevation: 4, // add shadow - android only
    shadowColor: 'black', // add shadow - ios only
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.5,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  deviceNameText: {
    fontFamily: 'be-vietnam-medium',
    color: 'rgba(30, 41, 51, 1)',
    fontSize: 16,
  },
  toggleText: {
    color: '#798794',
  },
});
