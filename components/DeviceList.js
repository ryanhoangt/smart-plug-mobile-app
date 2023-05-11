import { useDispatch, useSelector } from 'react-redux'
import DeviceController from './Home/DeviceController'
import { Alert } from 'react-native'
import LoadingOverlay from './UI/LoadingOverlay'
import { useEffect } from 'react'
import MQTTCLient from '../model/MQTTClient'
import { updateState } from '../redux/features/deviceSlice'

function DeviceList() {
  const dispatch = useDispatch()
  const { devices, loading, error } = useSelector((state) => state.devices)

  useEffect(() => {
    const mqttClient = MQTTCLient.getInstance()
    mqttClient.on('message', (topic, message) => {
      dispatch(updateState({ topic, message: message.toString() }))
    })
  }, [])

  if (error) return Alert.alert(error)

  if (loading || !devices) return <LoadingOverlay />

  return devices.map((device) => (
    <DeviceController key={device._id} device={device} />
  ))
}

export default DeviceList
