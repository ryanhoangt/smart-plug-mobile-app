export default class Sensor {
  constructor(_id, name, type_sensor, value, isOnline = true) {
    this._id = _id;
    this.name = name;
    this.type_sensor = type_sensor;
    this.value = value;
    this.isOnline = isOnline;
  }
}
