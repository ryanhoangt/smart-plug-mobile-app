export default class Automation {
  constructor(_id, name, actions, time, repeats, user) {
    this.id = _id;
    this.name = name;
    this.actions = actions;
    this.time = time;
    this.repeats = repeats;
    this.user = user
  }
}
