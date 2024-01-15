const sequelize = require("../config/connection")
const {User,Todo} = require("../models")
const seedMe = async ()=>{
    await sequelize.sync({force:true});
    const userData= [
        {
            email:"joe@joe.joe",
            password:"password"
        },
        {
            email:"theCats@joejoe",
            password:"iLoveSalmon"
        }
    ]

    const todoData = [
        {
            task:"Teach",
            priority:"high",
            UserId:1
        },
        {
            task:"Meow",
            priority:"low",
            UserId:2
        }
    ]

    await User.bulkCreate(userData,{
       individualHooks:true
    });
    await Todo.bulkCreate(todoData);
    process.exit(0)
}

seedMe();