const View = require("../views/View");
const Wine = require("../models/Wine");


class Controller {
  static showWines() {
    let wines = Wine.getWines();
    View.show(wines);
  }
  static add(params) {
    Wine.add(params)
  }
  static delete(params) {
    Wine.delete(params)
  }
  static update(params) {
    Wine.update(params)
  }
  static message(msg) {
    Wine.log(msg);
  }
}

module.exports = Controller;