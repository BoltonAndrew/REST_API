const express = require('express');
const app = express();
require('./db/connection');
const { userRouter } = require('./routes/user');
const { postRouter } = require('./routes/post');
const port = process.env.PORT || 5000

app.use(express.json());
app.use(userRouter);
app.use(postRouter);

app.get("/health", (req, res) => {
    res.status(200).send({ message: "API is working" });
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});