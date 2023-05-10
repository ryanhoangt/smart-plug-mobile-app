import { useSelector } from 'react-redux'
import DeviceController from './Home/DeviceController'
import { Alert } from 'react-native'
import LoadingOverlay from './UI/LoadingOverlay'

function DeviceList() {
  const { devices, loading, error } = useSelector((state) => state.devices)

  if (error) return Alert.alert(error)

  if (loading || !devices) return <LoadingOverlay />

  return devices.map((device) => (
    <DeviceController key={device._id} device={device} />
  ))
}

export default DeviceList
