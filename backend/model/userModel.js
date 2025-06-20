const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../utils/db-connection')


const Cricketer = sequelize.define('cricketerdetails', {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    dob:{
        type:DataTypes.DATE,
        allowNull:false
    },
    url:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isUrl:true
        }
    },
    birth_place:{
        type:DataTypes.STRING,
        allowNull:false,

    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    no_of_matches:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
})

module.exports = {
    Cricketer
}