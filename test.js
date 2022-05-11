var Chef = function () {
    this.dishes = ['Dosa', 'Tea', 'Pokoras', 'Pav Bhaji'];
    this.customers = 5;
};
Chef.prototype.checkMenu = function () {
    //returns a string
    //returns a random dish from the dishes array
    let dish = this.dishes[Math.floor(Math.random() * this.dishes.length)];

    console.log("I will like to have:", dish);
    return dish;
};

Chef.prototype.customersFed = function () {

    if (this.customers >= 1) {

        console.log("Customer fed with yummy food!");
        this.customers--;

    } else if (this.customers == 0) {
        console.log("All customers have been satisfied. Done for the day!");
    } else {
        let cusLeft = this.customers;
        console.log("Customer fed with yummy food!", cusLeft, "more to go!");
        this.customers -= cusLeft;
    }

    return this.customers;
};

let chef = new Chef();

module.exports = chef;
const Player = require('./src/app/models/Player');
//====================
const knex = require('./src/db/knex');
require('dotenv').config();
var defaultUser = {
    email: "player1@gmail.com",
    password: "123"
};
// knex('players').select('tutorial_started_at').where('email', defaultUser.email).first().then( (player) => console.log(player));
(async function () {
    try {
        let rs = await Player.query().where('email', defaultUser.email)
            .first()
            // updateAndFetch({ tutorial_step_passed: 4 });
        console.log(rs)
    } catch (error) {
        console.log("🚀 ~ error", error)
    }

 })();
