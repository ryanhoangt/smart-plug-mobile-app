import React, { Component } from 'react';
import { Container, Form, Item, Picker, Label, Input } from 'native-base';
import { Colors } from '../../constants/colors';

export default class AddDeviceForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceType: undefined,
      deviceName: '',
      pinNumber: '',
    };

    this.onDropDownChange = (value) => {
      this.setState({ ...this.state, deviceType: value });
    };

    this.onDeviceNameChange = (value) => {
      this.setState({ ...this.state, deviceName: value });
    };

    this.onPinNumberChange = (value) => {
      this.setState({ ...this.state, pinNumber: value });
    };
  }
  render() {
    return (
      <Container>
        <Form
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
          <Item floatingLabel style={{ margin: 10, padding: 16 }}>
            <Label
              style={{
                fontSize: 18,
                fontFamily: 'open-sans-bold',
                color: 'black',
              }}
            >
              Device's name:
            </Label>
            <Input
              value={this.state.deviceName}
              onChangeText={this.onDeviceNameChange.bind(this)}
            />
          </Item>

          <Item floatingLabel style={{ margin: 10, padding: 16 }}>
            <Label
              style={{
                fontSize: 18,
                fontFamily: 'open-sans-bold',
                color: 'black',
              }}
            >
              Microbit's pin number:
            </Label>
            <Input
              value={this.state.pinNumber}
              onChangeText={this.onPinNumberChange.bind(this)}
            />
          </Item>
          <Item picker style={{ margin: 15, padding: 16, flexWrap: 'wrap' }}>
            <Label
              style={{
                fontSize: 18,
                fontFamily: 'open-sans-bold',
                color: 'black',
                width: '100%',
              }}
            >
              Device's Type:
            </Label>
            <Picker
              mode="dropdown"
              style={{ width: undefined }}
              placeholder="Select a type"
              placeholderStyle={{ color: 'grey' }}
              selectedValue={this.state.deviceType}
              onValueChange={this.onDropDownChange.bind(this)}
            >
              <Picker.Item label="Light Sensor" value="light_ss" />
              <Picker.Item
                label="Temperature / Humidity Sensor"
                value="temp/humid_ss"
              />
              <Picker.Item label="Sound" value="sound_ss" />
              <Picker.Item label="Movement" value="movement_ss" />
              <Picker.Item label="Non-sensor Devices" value="non_ss" />
            </Picker>
          </Item>
        </Form>
      </Container>
    );
  }
}
