import mongoose from 'mongoose';
import postMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    try{
        const postMessages = await postMessage.find();

        res.status(200).join(postMessages);
    }catch (error) {
        res.status(404).json({ message: error.message });
    }
}



export const createPost = async (res, req) => {
    const body = req.body;

    const newPost = new postMessage(post);
    
    try {
        await newPost.save();

        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async(req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post wih that id');

    const updatedPost = await postMessage.findByIdAndUpdate(_id, { ... post, _id }, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this Id');

    await postMessage.findByIdAndRemove(id);

    console.log('DELETE!');
    
    res.json({ message: 'post deleted successfully'})
}

export const likePost = async (req, res) => {
    const{ id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this Id');

    const post = await postMessage.findById(id);
    const updatedPost = await postMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1}, { new: true })

    res.json(updatedPost)
}