const express = require('express');
const app = express();
require('./db/connection');
const mongoose = require('mongoose');
const { User } = require('./models/User');
const { Post } = require('./models/Post')
const port = process.env.PORT || 5000

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).send({ message: "API is working" });
})

app.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find({});
        let postContent = [];
        await posts.map((post) => {
            postContent.push(post);
        });
        res.status(200).send(postContent);
    } catch (error) {
        res.status(500).send(error)
    }
});

app.post("/posts", async (req, res) => {
    try {
        const post = new Post(req.body);
        const savedpost = await post.save();
        res.status(201).send(savedpost)
    } catch (error) {
        res.status(500).send({ message: "Could not connect" });
    }
    
});

app.patch("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).send(post);
    } catch (error) {
        res.status(404).send({ message: "post not found" });
    };
});

app.delete("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        res.status(200).send(post)
    } catch (error) {
        res.status(404).send({ message: "post not found" });
    };
});

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