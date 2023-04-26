import React, { Component } from 'react';
import { Colors } from '../../constants/colors';
import { Alert, StyleSheet, View, Text, TextInput } from 'react-native';
import FlatButton from '../UI/FlatButton';

import {
  createNewDevice,
  createNewSensor,
} from '../../services/user-data.service';

import { Picker } from '@react-native-picker/picker';

export default class AddDeviceForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceType: undefined,
      deviceName: '',
      pinNumber: '',
    };

    this.onDropDownChange = (value) => {
      console.log(value);
      this.setState({ ...this.state, deviceType: value });
    };

    this.onDeviceNameChange = (value) => {
      console.log(value);
      this.setState({ ...this.state, deviceName: value });
    };

    this.onPinNumberChange = (value) => {
      console.log(value);
      this.setState({ ...this.state, pinNumber: value });
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit() {
    try {
      if (this.state.deviceType === 'non_ss') {
        await createNewDevice(
          this.props.token,
          this.props.userId,
          this.state.deviceName,
          this.state.pinNumber
        );
      } else {
        await createNewSensor(
          this.props.token,
          this.props.userId,
          this.state.deviceName,
          this.state.deviceType,
          this.state.pinNumber
        );
      }

      // update data
      await this.props.fetchDevicesAndScenarios();
    } catch (err) {
      console.log(err);
      Alert.alert(
        'Creation Failed',
        'Could not create your new device. Please try again later.'
      );
    } finally {
      this.props.onCancel();
    }
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: Colors.greenPrimary,
          padding: 16,
          height: 450,
          margin: 10,
          borderRadius: 40,
          borderWidth: 4,
          borderStyle: 'dashed',
        }}
      >
        <View style={{ padding: 16 }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'open-sans-bold',
              color: 'black',
            }}
          >
            Device's name:
          </Text>
          <TextInput
            value={this.state.deviceName}
            onChangeText={this.onDeviceNameChange.bind(this)}
            style={styles.textInput}
          />
        </View>

        <View style={{ padding: 16, marginBottom: 30 }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'open-sans-bold',
              color: 'black',
            }}
          >
            Microbit's pin number:
          </Text>
          <TextInput
            value={this.state.pinNumber}
            onChangeText={this.onPinNumberChange.bind(this)}
            style={styles.textInput}
          />
        </View>
        <View
          style={{
            margin: 1,
            marginBottom: -10,
            padding: 16,
            flexDirection: 'row',
            // alignItems: 'flex-start',
            height: 100,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'open-sans-bold',
              color: 'black',
              width: '100%',
              flex: 0.4,
            }}
          >
            Device's Type:
          </Text>
          <Picker
            mode="dropdown"
            style={{
              width: undefined,
              height: 40,
              flex: 0.6,
              marginTop: -85,
              transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
            }}
            placeholder="Select a type"
            placeholderStyle={{ color: 'grey' }}
            selectedValue={this.state.deviceType}
            onValueChange={this.onDropDownChange.bind(this)}
          >
            <Picker.Item label="Light Sensor" value="Light" />
            <Picker.Item label="Heat Sensor" value="Heat" />
            <Picker.Item label="Humidity Sensor" value="Humidity" />
            <Picker.Item label="Sound Sensor" value="Sound" />
            <Picker.Item label="Movement Sensor" value="Movement" />
            <Picker.Item label="Non-sensor Devices" value="non_ss" />
          </Picker>
        </View>

        <View style={styles.buttons}>
          <FlatButton
            style={[styles.button, styles.flat]}
            onPress={this.props.onCancel}
          >
            Cancel
          </FlatButton>
          <FlatButton style={styles.button} onPress={this.onSubmit}>
            Create
          </FlatButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
  },
  flat: {
    backgroundColor: 'transparent',
  },
  textInput: {
    margin: 4,
    padding: 8,
    borderRadius: 6,
    fontSize: 18,
    backgroundColor: 'white',
  },
});

// render() {
//     return (
//       <Container>
//         <Form
//           style={{
//             backgroundColor: Colors.greenPrimary,
//             padding: 16,
//             height: 450,
//             margin: 10,
//             borderRadius: 40,
//             borderWidth: 4,
//             borderStyle: 'dashed',
//           }}
//         >
//           <Item floatingLabel style={{ margin: 10, padding: 16 }}>
//             <Label
//               style={{
//                 fontSize: 18,
//                 fontFamily: 'open-sans-bold',
//                 color: 'black',
//               }}
//             >
//               Device's name:
//             </Label>
//             <Input
//               value={this.state.deviceName}
//               onChangeText={this.onDeviceNameChange.bind(this)}
//             />
//           </Item>

//           <Item floatingLabel style={{ margin: 10, padding: 16 }}>
//             <Label
//               style={{
//                 fontSize: 18,
//                 fontFamily: 'open-sans-bold',
//                 color: 'black',
//               }}
//             >
//               Microbit's pin number:
//             </Label>
//             <Input
//               value={this.state.pinNumber}
//               onChangeText={this.onPinNumberChange.bind(this)}
//             />
//           </Item>
//           <Item picker style={{ margin: 15, padding: 16, flexWrap: 'wrap' }}>
//             <Label
//               style={{
//                 fontSize: 18,
//                 fontFamily: 'open-sans-bold',
//                 color: 'black',
//                 width: '100%',
//               }}
//             >
//               Device's Type:
//             </Label>
//             <Picker
//               mode="dropdown"
//               style={{ width: undefined }}
//               placeholder="Select a type"
//               placeholderStyle={{ color: 'grey' }}
//               selectedValue={this.state.deviceType}
//               onValueChange={this.onDropDownChange.bind(this)}
//             >
//               <Picker.Item label="Light Sensor" value="light_ss" />
//               <Picker.Item
//                 label="Temperature / Humidity Sensor"
//                 value="temp/humid_ss"
//               />
//               <Picker.Item label="Sound" value="sound_ss" />
//               <Picker.Item label="Movement" value="movement_ss" />
//               <Picker.Item label="Non-sensor Devices" value="non_ss" />
//             </Picker>
//           </Item>

//           <View style={styles.buttons}>
//             <FlatButton
//               style={[styles.button, styles.flat]}
//               onPress={this.props.onCancel}
//             >
//               Cancel
//             </FlatButton>
//             <FlatButton style={styles.button} onPress={this.onSubmit}>
//               Create
//             </FlatButton>
//           </View>
//         </Form>
//       </Container>
//     );
//   }
