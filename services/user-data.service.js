import { BACKEND_HOST } from '@env';
import Device from '../model/device';
import axios from 'axios';
import Scenario from '../model/scenario';
import Sensor from '../model/sensor';
import Automation from '../model/automation';

async function getAllDevices(userId) {
  const devicesUrl = BACKEND_HOST + `/users/${userId}/devices`;
  const { data: devicesData } = await axios.get(devicesUrl);

  return devicesData.metadata.devices.map(
    (device) => new Device(device._id, device.name, device.state)
  );
}

async function getAllScenarios(userId) {
  const scenariosUrl = BACKEND_HOST + `/users/${userId}/scenarios`;
  const { data: scerariosData } = await axios.get(scenariosUrl);

  return scerariosData.metadata.scenarios.map(
    (scenario) => new Scenario(scenario._id, scenario.name, scenario.isFavorite)
  );
}

async function getAllSensors(userId) {
  const sensorsUrl = BACKEND_HOST + `/users/${userId}/sensors`;
  const { data } = await axios.get(sensorsUrl);

  return data.metadata.sensors.map(
    (sensor) =>
      new Sensor(sensor._id, sensor.name, sensor.type_sensor, sensor.value)
  );
}

async function getAllAutomations(userId) {
  const automationsUrl = BACKEND_HOST + `/users/${userId}/automations`;
  const { data } = await axios.get(automationsUrl);

  return data.metadata.automations.map(
    (autom) => new Automation(autom._id, autom.name)
  );
}

async function createNewDevice(token, userId, deviceName, pinNumber) {
  const devicesUrl = BACKEND_HOST + `/devices`;
  console.log(devicesUrl, token, userId, deviceName, pinNumber);
  const { data } = await axios.post(
    devicesUrl,
    {
      user: userId,
      name: deviceName,
      state: false,
      topic: pinNumber,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(data);
}

function _fromTypeSensorToTypeValue(typeSensor) {
  switch (typeSensor) {
    case 'Light':
      return 'analog';
    case 'Heat':
      return 'analog';
    case 'Humidity':
      return 'analog';
    case 'Sound':
      return 'analog';
    case 'Movement':
      return 'digital';
    default:
      return '';
  }
}

async function createNewSensor(
  token,
  userId,
  sensorName,
  sensorType,
  pinNumber
) {
  const sensorsUrl = BACKEND_HOST + `/sensors`;
  const { data } = await axios.post(
    sensorsUrl,
    {
      user: userId,
      name: sensorName,
      type_value: _fromTypeSensorToTypeValue(sensorType),
      type_sensor: sensorType,
      topic: pinNumber,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(data);
}

export {
  getAllDevices,
  getAllScenarios,
  getAllSensors,
  getAllAutomations,
  createNewDevice,
  createNewSensor,
};
