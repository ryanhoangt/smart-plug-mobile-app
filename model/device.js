import Accessory from './accessory'

export default class Device extends Accessory {
  constructor(_id, name, state, topic, user) {
    super(_id, name, topic, user)
    this.state = state
  }

  toggleState() {
    this.mqttClient.publish(this.topic, this.state ? '0' : '1')
    this.state = !this.state
  }

  setState(state) {
    this.state = state
    this.mqttClient.publish(this.topic, state ? '1' : '0')
  }
}
