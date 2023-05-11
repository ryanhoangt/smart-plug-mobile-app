import { createMQTTClient, getAdafruitKey } from '../services/mqtt.service'
import { DeviceEventEmitter } from 'react-native'

class Accessory {
  constructor(_id, name, topic, user) {
    this.id = _id
    this.name = name
    this.topic = getAdafruitKey(topic)
    this.user = user
  }

  mount() {
    this.mqttClient = createMQTTClient()
    this.mqttClient.on('connect', this.onConnect.bind(this))
    this.mqttClient.on('message', this.onMessage.bind(this))
    this.mqttClient.on('error', (error) => console.log(error.message))
  }

  onConnect() {
    console.log(`${this.name} connected`)
    this.mqttClient.subscribe(this.topic, (err) => {
      if (err) return console.error(`Failed to subscribe ${this.topic}`)

      console.log(`Subscribed to ${this.topic}`)
    })
  }

  onMessage(topic, message) {
    console.log(topic, message.toString())
    DeviceEventEmitter.emit(topic, message.toString())
  }

  unmount() {
    this.mqttClient.end()
  }
}

export default Accessory
