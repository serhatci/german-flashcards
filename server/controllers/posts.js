import { User } from "../models/post.js";

export const getData = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getMasterData = async (req, res) => {
  try {
    const masterData = await User.find(
      { userName: "master" },
      { topics: 1, _id: 0 }
    );
    res.status(200).json(masterData);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const updateData = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatedPost);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const addUser = async (req, res) => {
  const post = req.body;
  let newUser = new User(post);
  newUser.topics = getMasterData();
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndRemove(_id);
    res.json(deletedPost);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};
