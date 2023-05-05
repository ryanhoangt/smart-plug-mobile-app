import Device from '../model/device'

async function getAllDevices(instance) {
  const { data: devicesData } = await instance.get('/devices')

  return devicesData.metadata.devices.map(
    ({ _id, name, state, topic, user }) =>
      new Device(_id, name.trim(), state, topic, user)
  )
}

export { getAllDevices }
