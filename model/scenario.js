export default class Scenario {
  constructor(_id, name, isFavorite, actions = null, user) {
    this.id = _id;
    this.name = name;
    this.isFavorite = isFavorite;
    this.actions = actions;
    this.user = user
  }
}
