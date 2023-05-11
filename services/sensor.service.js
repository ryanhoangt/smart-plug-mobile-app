import { SensorFactory as Factory } from '../model/sensor'
import { createInstance } from './axios.service'

async function getAllSensors(instance) {
  const endpoint = '/sensors'
  const { data } = await instance.get(endpoint)

  return data.metadata.sensors.map((sensor) => {
    const { type_sensor, _id, name, value, topic, user } = sensor
    return Factory.createSensor(type_sensor, _id, name, value, topic, user)
  })
}

async function createSensor(auth_token, name, topic, type) {
  const instance = createInstance(auth_token)
  const endpoint = '/sensors'
  try {
    const newSensor = await instance.post(endpoint, {
      name,
      topic,
      type_sensor: type,
      value: 0,
    })
    return newSensor
  } catch (err) {
    console.log(err.response)
  }
}

export { getAllSensors, createSensor }
