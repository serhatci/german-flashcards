import { User } from "../models/post.js";
import { frontendData, backendData } from "./convertFunctions.js";

export const getUserFlashcards = async (req, res) => {
  let user = req.body;
  let result = await userNotExists(user.userID);
  if (user.userID === "guest" || result) {
    user.userID = process.env.MASTER_UID;
  }

  try {
    const data = await User.find(user, {
      _id: 0,
      topics: 1,
      userName: 1,
    });
    res.status(200).json(frontendData(data));
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

async function userNotExists(uid) {
  const result = await User.find({ userID: uid });
  return result.length === 0 ? true : false;
}

export const updateData = async (req, res) => {
  let data = req.body;
  const new_topics = backendData(data);
  try {
    const update = await User.updateOne(
      { userID: data.userID },
      { $set: { topics: new_topics } }
    );
    res.json(update);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const getMasterTopics = async () => {
  try {
    const data = await User.find(
      { userName: "master" },
      { topics: 1, _id: 0 }
    );
    const topics = data[0].topics;
    return topics;
  } catch (error) {
    return { message: error.message };
  }
};

export const addUser = async (req, res) => {
  const post = req.body;
  let newUser = new User(post);
  newUser.topics = await getMasterTopics();
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
  const user = req.body;
  try {
    const deletedUser = await User.deleteOne(user);
    res.json(deletedUser);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};
