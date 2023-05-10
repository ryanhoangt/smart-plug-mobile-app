import { createMQTTClient } from '../services/mqtt.service'

class MQTTCLient {
  static #instance

  constructor() {
    console.log('This constructor is private. Try MQTT.getInstance() instead')
  }

  static createMQTTInstance() {
    const instance = createMQTTClient()
    instance.on('connect', () => {
      console.log('Connected to adafruit.io')
    })
    instance.on('error', () => {
      console.log('Failed to connect adafruit.io')
    })
    return instance
  }

  static getInstance() {
    if (!MQTTCLient.#instance) {
      MQTTCLient.#instance = MQTTCLient.createMQTTInstance()
    }

    return MQTTCLient.#instance
  }

  static isConnected() {
    return MQTTCLient.#instance.connected()
  }
}

export default MQTTCLient
