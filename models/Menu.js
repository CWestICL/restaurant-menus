const {sequelize} = require('../db');
const { Sequelize,DataTypes } = require('sequelize');

const Menu = sequelize.define("Menu", {
    title: {
        type: DataTypes.STRING
    }
});

module.exports = {Menu};