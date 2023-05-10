async function getAllDevices(instance) {
  const { data } = await instance.get('/devices')

  return data.metadata.devices
  // return devicesData.metadata.devices.map(
  //   ({ _id, name, state, topic, user }) =>
  //     new Device(_id, name.trim(), state, topic, user)
  // )
}

export { getAllDevices }
