const fs = require("fs");
const { json } = require("stream/consumers");

class Wine {
    constructor(id, name, year, type, createdAt) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.type = type;
        this.createdAt = createdAt;
    }

    //fungsi static untuk ambil data dari wines.json
    static getWines() {
        let wines = fs.readFileSync("./wines.json", "utf8");

        if (wines !== "") {
            wines = JSON.parse(wines);
            wines = wines.map((wine) => {
                const { id, name, year, type, createdAt } = wine;
                return new Wine(id, name, year, type, createdAt);
            });
        } else {
            wines = [];
        }

        return wines;
    }

    // fungsi static untuk menambah data wine ke wines.json (add command)
    static add(params){
        let wines = this.getWines();
        const wineName = params[0];
        let id;
        wines.length !== 0 ? (id = wines[wines.length - 1].id + 1) : (id - 1);
        let formatName = this.formatWine(wineName);
        let { year, type, name } = formatName;
        let createdAt = new Date();

        wines.push(new Wine(id, name, year, type, createdAt));
        this.save(wines)
        
        return `"${name}" has been add to the wines.`;
    }

    static formatWine(wineName) {
        let formatName = wineName.split("/");
        let [name, year, type] = formatName;
        year = Number(year);
        switch (type) {
            case "R" || "r":
                type = "Red";
                break;
            case "W" || "w":
                type = "White";
                break;
            default:
                type = "Other";
                break;
        }
        formatName = { name, year, type };
        return formatName;  
    }

    // fungsi static untuk menjual data dari wines.json (sell command)
    static sell(params){
        let wines = this.getWines();
        let id = +params[0];

        let name;
        wines.forEach((wine) => {
            if (wine.id === id) {
                name = wine.name;
            }
        });

        wines = wines.filter((wines) => wine.id !== id);
        this.save(wines);
        return `"${name}" has been sold.`
    }
    // fungsi static untuk mengganti data dari wines.json (rename command)
    static rename(params){
        let wines = this.getWines();
        let [id, wineName] = params;
        id = +id;

        wines = wines.map(wine => {
            if(wine.id === id) {
                let formatName = this.formatWine(wineName);
                let { name, year, type } = formatName;
                wine.name = name;
                wine.year = year;
                wine.type = type;
                }
                return wine;

            });
        this.save(wines);
        return `Wine id ${id} has been renamed.`;
    }

    // fungsi static untuk mencari data dengan ID di wines.json (findByid command)
    static findById(params){
        const wines = this.getWines();
        let [id] = params;
        id = +id;

        let foundWine = {};
        wines.forEach((wine) => {
            if (wine.id === id) {
                foundWine = wine;
            }
        });

        let { name, year, type } = foundWine;
        return `${name} is ${type} wine with age of ${2023 - year} years.`;
    }

    //static save
    static save(){
        let winesString = JSON.stringify(wines, null, 2);
        fs.writeFileSync("./wines.json", winesString);
    }
}

module.exports = Wine;
