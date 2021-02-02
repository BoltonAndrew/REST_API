const { Router } = require('express');
const userRouter = Router();
const { getAllUsers, getOneUser, addUser, updateUser, deleteUser } = require('../controllers/user');

userRouter.route("/users")
.get(getAllUsers)
.post(addUser);
userRouter.route("/users/:id")
.get(getOneUser)
.patch(updateUser)
.delete(deleteUser);

module.exports = {
    userRouter,
};