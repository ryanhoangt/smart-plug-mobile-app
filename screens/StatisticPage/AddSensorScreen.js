import React, { useContext, useState } from 'react'
import {
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  View,
  Pressable,
  Alert,
} from 'react-native'
import { defaultStyles } from '../../constants/defaultStyle'
import { Colors } from '../../constants/colors'
import SelectDropdown from 'react-native-select-dropdown'
import { AuthContext } from '../../store/auth-context'
import { useDispatch, useSelector } from 'react-redux'
import { createSensor } from '../../redux/features/sensorSlice'
import LoadingOverlay from '../../components/UI/LoadingOverlay'

function AddSensorScreen({ navigation }) {
  const [name, onChangeName] = useState('')
  const [topic, onChangeTopic] = useState('')
  const [type, setType] = useState('unknown')
  const { token } = useContext(AuthContext)
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.sensors)

  async function handleCreateSensor() {
    const sensorData = { name, topic, type_sensor: type }
    const res = await dispatch(createSensor({ token, sensor: sensorData }))

    const status = res.meta.requestStatus
    if (status == 'rejected') {
      // setError('There is an error in creating sensor')
      // return Alert.alert('There is an error in creating sensor')
    } else if (status == 'fulfilled') {
      setTimeout(() => {
        navigation.navigate('Statistics')
      }, 1000)
      return Alert.alert('Create sensor successfully')
    }
  }

  if (loading) return <LoadingOverlay />

  return (
    <ScrollView style={defaultStyles.container}>
      <TextInput
        onChangeText={onChangeName}
        style={styles.nameInput}
        placeholder="Sensor name:"
      />

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Topic: </Text>
        <TextInput onChangeText={onChangeTopic} style={styles.input} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Type: </Text>
        <SelectDropdown
          defaultButtonText="Select sensor type"
          buttonStyle={styles.dropdownInput}
          data={['Temperature', 'Humidity', 'Light', 'Unknown']}
          onSelect={(selectedItem) => {
            setType(selectedItem.toLowerCase())
          }}
        />
      </View>

      <View>
        <Pressable style={styles.btn} onPress={handleCreateSensor}>
          <Text style={styles.text}>Add sensor</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

export default AddSensorScreen

const styles = StyleSheet.create({
  nameInput: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputGroup: {
    marginTop: 24,
  },
  dropdownInput: {
    marginTop: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.grayPrimary,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.grayPrimary,
    borderRadius: 6,
  },
  section: {
    marginVertical: 24,
  },
  btn: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
})
