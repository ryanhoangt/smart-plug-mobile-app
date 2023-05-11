import { createMQTTClient } from '../services/mqtt.service'

class MQTTCLient {
  static #instance

  constructor() {
    const instance = createMQTTClient()
    instance.on('connect', () => {
      console.log('Connected to adafruit.io')
    })
    instance.on('error', () => {
      console.log('Failed to connect adafruit.io')
    })
    return instance
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
      MQTTCLient.#instance = new MQTTCLient()
    }

    return MQTTCLient.#instance
  }

  static isConnected() {
    return MQTTCLient.#instance.connected()
  }
}

export default MQTTCLient
