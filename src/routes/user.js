const { Router } = require('express');
const userRouter = Router();
const { getMyProfile, getOneUser, addUser, updateUser, deleteUser, login, logout } = require('../controllers/user');
const { hashPassword, auth } = require('../middleware');

userRouter.route("/users/myprofile")
.get(auth, getMyProfile)
userRouter.route("/users").post(hashPassword, addUser);
userRouter.route("/users/:id")
.get(auth, getOneUser)
.patch(auth, hashPassword, updateUser)
.delete(auth, deleteUser);
userRouter.route("/users/login").post(login)
userRouter.route("/users/logout").get(auth, logout)

module.exports = {
    userRouter,
};