import { BACKEND_HOST } from '@env';
import Device from '../model/device';
import axios, { Axios } from 'axios';
import Scenario from '../model/scenario';
import Sensor from '../model/sensor';
import Automation from '../model/automation';

async function getAllDevices(instance) {
  // const devicesUrl = BACKEND_HOST + `/users/${userId}/devices`;
  // const { data: devicesData } = await axios.get(devicesUrl);
  const { data: devicesData } = await instance.get("/devices");

  return devicesData.metadata.devices.map(
    (device) => new Device(device._id, device.name, device.state)
  );
}

async function getAllScenarios(instance) {
  const { data: scerariosData } = await instance.get("/scenarios");

  return scerariosData.metadata.scenarios.map(
    (scenario) => new Scenario(scenario._id, scenario.name, scenario.isFavorite)
  );
}

async function getAllSensors(instance) {
  const sensorsUrl = BACKEND_HOST + `/users/${userId}/sensors`;
  const { data } = await instance.get(sensorsUrl);

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

export { getAllDevices, getAllScenarios, getAllSensors, getAllAutomations };
