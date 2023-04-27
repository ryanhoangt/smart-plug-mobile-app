import Sensor from '../model/sensor'

async function getAllSensors(instance) {
  const sensorsUrl = BACKEND_HOST + `/users/${userId}/sensors`
  const { data } = await instance.get(sensorsUrl)

  return data.metadata.sensors.map(
    (sensor) =>
      new Sensor(sensor._id, sensor.name, sensor.type_sensor, sensor.value)
  )
}

export { getAllSensors }
