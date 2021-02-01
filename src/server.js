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

app.get("/users", (req, res) => {
    
});

app.post("/users", async (req, res) => {
    try {
        const user = new User(req.body);
        user.save();
        res.status(201).send({ message: "succesfully added to database" })
    } catch (error) {
        res.status(500).send({ message: "Could not connect" });
    }
    
});

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});