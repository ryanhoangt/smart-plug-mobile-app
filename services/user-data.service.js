import appConfig from '../configs/app.config'
import axios from 'axios'
import Scenario from '../model/scenario'
import Sensor from '../model/sensor'
import Automation from '../model/automation'

const BACKEND_HOST = appConfig.BACKEND_HOST

async function getAllScenarios(instance) {
  const { data: scerariosData } = await instance.get('/scenarios')

  return scerariosData.metadata.scenarios.map(
    (scenario) => new Scenario(scenario._id, scenario.name, scenario.isFavorite)
  )
}

async function getAllSensors(instance) {
  const sensorsUrl = BACKEND_HOST + `/users/${userId}/sensors`
  const { data } = await instance.get(sensorsUrl)

  return data.metadata.sensors.map(
    (sensor) =>
      new Sensor(sensor._id, sensor.name, sensor.type_sensor, sensor.value)
  )
}

async function getAllAutomations(userId) {
  const automationsUrl = BACKEND_HOST + `/users/${userId}/automations`
  const { data } = await axios.get(automationsUrl)

  return data.metadata.automations.map(
    (autom) => new Automation(autom._id, autom.name)
  )
}

async function createNewDevice(token, userId, deviceName, pinNumber) {
  const devicesUrl = BACKEND_HOST + `/devices`
  console.log(devicesUrl, token, userId, deviceName, pinNumber)
  const { data } = await axios.post(
    devicesUrl,
    {
      name: deviceName,
      state: false,
      topic: pinNumber,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  console.log(data)
}

function _fromTypeSensorToTypeValue(typeSensor) {
  switch (typeSensor) {
    case 'Light':
      return 'analog'
    case 'Heat':
      return 'analog'
    case 'Humidity':
      return 'analog'
    case 'Sound':
      return 'analog'
    case 'Movement':
      return 'digital'
    default:
      return ''
  }
}

async function createNewSensor(
  token,
  userId,
  sensorName,
  sensorType,
  pinNumber
) {
  const sensorsUrl = BACKEND_HOST + `/sensors`
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
  )
  console.log(data)
}

export {
  getAllScenarios,
  getAllSensors,
  getAllAutomations,
  createNewDevice,
  createNewSensor,
}
