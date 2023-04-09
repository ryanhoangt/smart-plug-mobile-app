export default class Scenario {
  constructor(_id, name, isFavorite, actions = null) {
    this._id = _id;
    this.name = name;
    this.isFavorite = isFavorite;
    this.actions = actions;
  }
}
