const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../utils/db-connection')


const Cricketer = sequelize.define('cricketerdetails', {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        
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
        type:DataTypes.TEXT,
        allowNull:false
    },
    no_of_matches:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    score:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    fifties:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    centuries:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    wickets:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    average:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
})

module.exports = {
    Cricketer
}