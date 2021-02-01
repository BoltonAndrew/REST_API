const { Router } = require('express');
const postRouter = Router();
const { getAllPosts, addPost, updatePost, deletePost } = require('../controllers/post');

postRouter.get("/posts", getAllPosts);

postRouter.post("/posts/:user_id", addPost);

postRouter.route("/posts/:id")
.patch(updatePost)
.delete(deletePost);

module.exports = {
    postRouter,
};