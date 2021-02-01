const { Router } = require('express');
const postRouter = Router();
const { Post } = require('../models/Post');

postRouter.get("/posts", async (req, res) => {
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

postRouter.post("/posts/:user_id", async (req, res) => {
    try {
        const post = new Post(req.body);
        post.author = req.params.user_id;
        const savedPost = await post.save();
        res.status(201).send(savedPost);
    } catch (error) {
        res.status(500).send({ message: "Could not connect" });
    }
    
});

postRouter.patch("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).send(post);
    } catch (error) {
        res.status(404).send({ message: "post not found" });
    };
});

postRouter.delete("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        res.status(200).send(post)
    } catch (error) {
        res.status(404).send({ message: "post not found" });
    };
});

module.exports = {
    postRouter,
};