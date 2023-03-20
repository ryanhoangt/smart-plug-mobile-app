import React from 'react';
import { Text, ScrollView, TextInput, StyleSheet, View } from 'react-native';
import { defaultStyles } from '../../constants/defaultStyle';
import DeviceControl from '../../components/Automation/DeviceControl';

function AddAutomationScreen() {
  return (
    <ScrollView style={defaultStyles.container}>
      <TextInput style={styles.nameInput} placeholder="Automation name:"></TextInput>
      <View style={styles.section}>
        <Text style={defaultStyles.sectionTitle}>Accessories</Text>
        <View>
          <DeviceControl deviceName={"Shades"}></DeviceControl>
          <DeviceControl deviceName={"Light 1"}></DeviceControl>
          <DeviceControl deviceName={"Light 2"}></DeviceControl>
        </View>
      </View>
    </ScrollView>
  )
}

export default AddAutomationScreen

const styles = StyleSheet.create({
  nameInput: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  section: {
    marginVertical: 24,
  },
})