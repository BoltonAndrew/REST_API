const express = require('express');
const app = express();
require('./db/connection');
const mongoose = require('mongoose');
const { User } = require('./models/User');
const port = process.env.PORT || 5000

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).send({ message: "API is working" });
})

app.get("/users", async (req, res) => {
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

app.post("/users", async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).send(savedUser)
    } catch (error) {
        res.status(500).send({ message: "Could not connect" });
    }
    
});

app.patch("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        // const user = await User.find({ name: req.params.id });
        // console.log(user);
        // user.name = req.body.name;
        // console.log(user.name);
        // const savedUser = await user.save();
        res.status(200).send(user);
    } catch (error) {
        res.status(404).send({ message: "User not found" });
    };
});

app.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).send(user)
    } catch (error) {
        res.status(404).send({ message: "User not found" });
    };
});

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});