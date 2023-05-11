import Accessory from './accessory'

export default class Sensor {
  constructor(_id, name, value, topic, user) {
    this.id = _id
    this.name = name
    this.topic = topic
    this.user = user
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
    return this._value > 100 ? 'light' : 'no light'
  }
}

class MovementSensor extends Sensor {
  constructor(id, name, value, topic, user) {
    super(id, name, value, topic, user)
    this.type = 'movement'
  }

  get value() {
    return this._value == 1 ? 'movement detected' : 'no movement'
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

class DistanceSensor extends Sensor {
  constructor(id, name, value, topic, user) {
    super(id, name, value, topic, user)
    this.type = 'distance'
  }

  get value() {
    return this._value + 'cm'
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
  static createSensor({ type_sensor, id, name, value, topic, user }) {
    switch (type_sensor.toLowerCase()) {
      case 'temperature':
        return new TemperatureSensor(id, name, value, topic, user)

      case 'humidity':
        return new HumiditySensor(id, name, value, topic, user)

      case 'light':
        return new LightSensor(id, name, value, topic, user)

      case 'movement':
        return new MovementSensor(id, name, value, topic, user)

      case 'distance':
        return new DistanceSensor(id, name, value, topic, user)

      default:
        return new UnknownSensor(id, name, value, topic, user)
    }
  }
}
