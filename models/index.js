const User = require("./User")
const Todo = require("./Todo")

User.hasMany(Todo,{
    onDelete:"CASCADE"
});
Todo.belongsTo(User)

module.exports = {
    User,
    Todo
}