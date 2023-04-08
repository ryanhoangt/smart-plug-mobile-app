export default class Scenario {
  constructor(_id, name, actions = null) {
    this._id = _id;
    this.name = name;
    this.actions = actions;
  }
}
