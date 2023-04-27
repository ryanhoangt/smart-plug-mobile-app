import { DeviceEventEmitter } from 'react-native'
import { createMQTTClient, getAdafruitKey } from '../services/mqtt.service'

export default class Device {
  constructor(_id, name, state, topic, user) {
    this.id = _id
    this.name = name
    this.state = state
    this.topic = getAdafruitKey(topic)
    this.user = user

    this.mqttClient = createMQTTClient()
    this.mqttClient.on('connect', this.onConnect.bind(this))
    this.mqttClient.on('message', this.onMessage.bind(this))
    // this.listen()
  }

  onConnect() {
    this.mqttClient.subscribe(this.topic, (err) => {
      if (err) return console.error(`Failed to subscribe ${this.topic}`)

      console.log(`Subscribed to ${this.topic}`)
    })
  }

  toggleState() {
    this.mqttClient.publish(this.topic, this.state ? '0' : '1')
    this.state = !this.state
  }

  setState(state) {
    this.state = state
    this.mqttClient.publish(this.topic, state ? '1' : '0')
  }

  onMessage(topic, message) {
    console.log(topic, message.toString())
    DeviceEventEmitter.emit(topic, message.toString())
  }
}
