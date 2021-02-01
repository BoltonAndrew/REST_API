const { Router } = require('express');
const userRouter = Router();
const { getAllUsers, addUser, updateUser, deleteUser } = require('../controllers/user');

userRouter.route("/users")
.get(getAllUsers)
.post(addUser);
userRouter.route("/users/:id")
.patch(updateUser)
.delete(deleteUser);

module.exports = {
    userRouter,
};