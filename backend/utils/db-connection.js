const {Sequelize} = require("sequelize")

const sequelize = new Sequelize('testdb', 'root', 'password', {
    host:"localhost",
    dialect:"mysql"
});


(async () => {
    try {
        sequelize.authenticate()
        console.log("Database is connected")
    } catch (error) {
        console.log(error)
    }
})()

module.exports = sequelize