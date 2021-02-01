const { Router } = require('express');
const userRouter = Router();
const { User } = require('../models/User');

userRouter.get("/users", async (req, res) => {
    try {
        const users = await User.find({});
        let userNames = [];
        await users.map((user) => {
            userNames.push(user.name);
        });
        res.status(200).send(userNames);
    } catch (error) {
        res.status(500).send(error)
    }
});

userRouter.post("/users", async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).send(savedUser)
    } catch (error) {
        res.status(500).send({ message: "Could not connect" });
    }
    
});

userRouter.patch("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).send(user);
    } catch (error) {
        res.status(404).send({ message: "User not found" });
    };
});

userRouter.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).send(user)
    } catch (error) {
        res.status(404).send({ message: "User not found" });
    };
});

module.exports = {
    userRouter,
}