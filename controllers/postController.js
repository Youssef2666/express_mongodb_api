const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.status(201).json(post);
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
        const post = await Post.findOne({ id: req.params.id });
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
            { id: req.params.id },
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
        const deletedPost = await Post.findOneAndDelete({ id: req.params.id });
        if (deletedPost) {
            res.status(200).json({ message: 'Post deleted successfully' });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete post', error });
    }
};
