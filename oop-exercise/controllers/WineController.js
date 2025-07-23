const Wine = require("../models/Wine");
const View = require("../views/WineView");

class WineController {
    static help(){
        View.help();
    }

    static wines(){
        const wines = Wine.getWines();
        View.showWine(wines);
    }
    static add(params){
        const result = Wine.add(params);
        View.message(results);
    }
    static sell(params){
        const result = Wine.sell(params);
        View.message(results);
    }
    static rename(params){
        const result = Wine.rename(params);
        View.message(results);
    }
    static add(findById){
        const result = Wine.add(findById);
        View.message(results);
    }
    static message(msg) {
        View.message(msg);
    }


}

module.exports = WineController;