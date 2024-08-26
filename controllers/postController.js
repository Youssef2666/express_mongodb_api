const Post = require('../models/Post');
const User = require('../models/User');

exports.createPost = async (req, res) => {
    try {
        const { userId, id, title, body } = req.body;

        // Find the user by userId
        const findUser = await User.findById(userId);
        if (!findUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new post with the user's ObjectId
        const newPost = new Post({
            userId, 
            id, 
            title, 
            body, 
            user: findUser._id 
        });
        await newPost.save();

        // Add the post's ID to the user's posts array
        findUser.posts.push(newPost._id);
        await findUser.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create post', error });
    }
};



exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ message: 'Failed to retrieve posts', error });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Failed to retrieve post', error });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        if (updatedPost) {
            res.status(200).json(updatedPost);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Failed to update post', error });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findOneAndDelete({ _id: req.params.id });
        if (deletedPost) {
            res.status(200).json({ message: 'Post deleted successfully' });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete post', error });
    }
};
