const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('activity', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            set(value) {
                this.setDataValue("name", value.toLowerCase())
            }
        },
        difficulty: {
            type: DataTypes.INTEGER,
            set(value){
                if(typeof value === 'string'){
                    this.setDataValue("difficulty", parseInt(value))
                }
            },
            validate: {
                min: 1,
                max: 5
            }
        },
        duration: {
            type: DataTypes.INTEGER,
            set(value){
                if(typeof value === 'string'){
                    this.setDataValue("duration", parseInt(value))
                }
            },
            validate: {
                min: 0,
                max: 8
            }
        },
        season: {
            type: DataTypes.JSON
        }
    })
}