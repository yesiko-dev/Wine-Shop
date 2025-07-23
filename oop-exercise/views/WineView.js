class WineView{
    static help(){
        console.log("Wine Management Command: ");
        console.log("node app.js");
        console.log("node app.js help");
        console.log("node app.js wines");
        console.log("node app.js add <wine_name>");
        console.log("node app.js add <wine_id>");      
        console.log("node app.js rename <wine_id> <wine_name>");
        console.log("node app.js findById <wine_id>");
    }
    static showWine(wines) {
        if (wines.length !== 0) {
            console.log("Welcome to Wine Management: ");
            wines.forEach((wines) => {
                const { id, name } = wines;
                console.log(`${id}. ${name}`);
                
            });
            
        } else {
            console.log("NOTHING IS HERE!!!");
        }
    }
    static message(msg) {
        console.log(msg);
    }
}





module.exports = WineView;