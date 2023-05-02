import Accessory from './accessory'

export default class Sensor extends Accessory {
  constructor(_id, name, value, topic, user) {
    super(_id, name, topic, user)
    this._value = value
  }

  setValue(value) {
    this._value = value
  }
}

class LightSensor extends Sensor {
  constructor(id, name, value, topic, user) {
    super(id, name, value, topic, user)
    this.type = 'light'
  }

  get value() {
    return this._value > 100 ? "light" : "no light"
  }
}

class TemperatureSensor extends Sensor {
  constructor(id, name, value, topic, user) {
    super(id, name, value, topic, user)
    this.type = 'temperature'
  }

  get value() {
    return this._value + '℃'
  }
}

class HumiditySensor extends Sensor {
  constructor(id, name, value, topic, user) {
    super(id, name, value, topic, user)
    this.type = 'humidity'
  }

  get value() {
    return this._value + 'g/m³'
  }
}

class UnknownSensor extends Sensor {
  constructor(id, name, value, topic, user) {
    super(id, name, value, topic, user)
    this.type = 'unknown'
  }

  get value() {
    return this._value
  }
}

export class SensorFactory {
  static createSensor(sensor_type, id, name, value, topic, user) {
    switch (sensor_type.toLowerCase()) {
      case 'temperature':
        return new TemperatureSensor(id, name, value, topic, user)

      case 'humidity':
        return new HumiditySensor(id, name, value, topic, user)

      case 'light':
        return new LightSensor(id, name, value, topic, user)

      default:
        return new UnknownSensor(id, name, value, topic, user)
    }
  }
}
