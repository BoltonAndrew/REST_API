const { User } = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error)
    };
};

exports.getOneUser = async (req, res) => {
    try {
        const user = await User.find({name: req.params.id})
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    };
};

exports.addUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).send(savedUser)
    } catch (error) {
        res.status(500).send({ message: "Could not connect" });
    };
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).send(user);
    } catch (error) {
        res.status(404).send({ message: "User not found" });
    };
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).send(user)
    } catch (error) {
        res.status(404).send({ message: "User not found" });
    };
};