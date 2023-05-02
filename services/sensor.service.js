import { SensorFactory as Factory } from '../model/sensor'

async function getAllSensors(instance) {
  const endpoint = '/sensors'
  const { data } = await instance.get(endpoint)

  return data.metadata.sensors.map((sensor) => {
    const { type_sensor, _id, name, value, topic, user } = sensor
    return Factory.createSensor(type_sensor, _id, name, value, topic, user)
  })
}

export { getAllSensors }
