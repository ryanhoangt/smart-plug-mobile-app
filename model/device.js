export default class Device {
  constructor(_id, name, state, topic, user) {
    this.id = _id;
    this.name = name;
    this.state = state;
    this.topic = topic;
    this.user = user
  }
}
