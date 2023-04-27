import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { defaultStyles } from '../../constants/defaultStyle';
import DeviceController from '../../components/Home/DeviceController';
import CustomButton from '../../components/UI/CustomButton';

export default function AddScenarioScreen() {
  const [pin, setPin] = useState(false);

  return (
    <ScrollView style={defaultStyles.container}>
      <TextInput style={styles.nameInput} placeholder="Scenario name:" />
      <View style={styles.section}>
        <Text style={defaultStyles.sectionTitle}>Accessories</Text>
        <View style={styles.deviceList}>
          {/* <DeviceController deviceName="Shades" />
          <DeviceController deviceName="Light 1" />
          <DeviceController deviceName="Light 2" />
          <DeviceController deviceName="Shades" /> */}
        </View>
      </View>

      <View style={styles.section}>
        <CustomButton primary first title="Add devices" />
        <CustomButton primary title="Test this scenario" />
        <CustomButton
          value={pin}
          onValueChange={() => setPin((prev) => !prev)}
          last
          title="Add to home view"
        />
      </View>
    </ScrollView>
  );
}

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

  deviceList: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 12,
    columnGap: 12,
  },
});
