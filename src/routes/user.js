const { Router } = require('express');
const userRouter = Router();
const { getAllUsers, getOneUser, addUser, updateUser, deleteUser, login } = require('../controllers/user');
const { hashPassword } = require('../middleware');

userRouter.route("/users")
.get(getAllUsers)
.post(hashPassword, addUser);
userRouter.route("/users/:id")
.get(getOneUser)
.patch(hashPassword, updateUser)
.delete(deleteUser);
userRouter.route("/login").post(login)

module.exports = {
    userRouter,
};