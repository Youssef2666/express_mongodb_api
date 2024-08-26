const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        const User = new User(req.body);
        await User.save();
        res.status(201).json(User);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create User', error });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const Users = await User.find();
        res.status(200).json(Users);
    } catch (error) {
        res.status(400).json({ message: 'Failed to retrieve Users', error });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const User = await User.findOne({ id: req.params.id });
        if (User) {
            res.status(200).json(User);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Failed to retrieve User', error });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Failed to update User', error });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ id: req.params.id });
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete User', error });
    }
};
