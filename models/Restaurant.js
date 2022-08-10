const {sequelize} = require('../db');
const { Sequelize,DataTypes } = require('sequelize');

const Restaurant = sequelize.define("Restaurant", {
    name: {
        type: DataTypes.STRING
    },
    location: {
        type: DataTypes.STRING
    },
    cuisine: {
        type: DataTypes.STRING
    }
});

module.exports = {Restaurant};