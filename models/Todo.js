const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Todo extends Model {}

Todo.init({
    // add properites here, ex:
    task: {
         type: DataTypes.STRING,
         allowNull:false
    },
    priority:{
        type: DataTypes.STRING,
        allowNull:false
    },
    complete:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
        allowNull:false
    }
    
},{
    sequelize
});

module.exports=Todo