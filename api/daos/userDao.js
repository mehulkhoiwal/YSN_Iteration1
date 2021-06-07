const User = require("../models/users");
const mongoose = require("mongoose");
var deepPopulate = require("mongoose-deep-populate");

exports.getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (user) return user;
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * 
 * @param {number} userId 
 * @param {number} followId 
 * @returns 
 * @author Prateek Dubey
 * This method is add following
 */
exports.addFollowing = async (userId, followId) => {
  try {
    const user = await User.updateOne(
      { _id: userId },
      { $push: { following: followId } }
    );
    if (user) return user;
    else return null;
  } catch (error) {
    return null;
  }
};
/**
 * @author Prateek Dubey
 * This method is to remove following
 */
exports.removeFollowing = async (userId, unFollowId) => {
  try {
    const user = await User.updateOne(
      { _id: userId },
      { $pull: { following: unFollowId } }
    );
    if (user) return user;
    else return null;
  } catch (error) {
    return null;
  }
};

/**
 * @author Mehul Khoiwal
 * This method is to add followers
 */
exports.addFollowers = async (userId, followId) => {
  try {
    const user = await User.updateOne(
      { _id: followId },
      { $push: { followers: userId } }
    );
    if (user) return user;
    else return null;
  } catch (error) {
    return null;
  }
};
/**
 * @author Mehul Khoiwal
 * This method is to remove followers
 */
exports.removeFollowers = async (userId, unFollowId) => {
  try {
    const user = await User.updateOne(
      { _id: unFollowId },
      { $pull: { followers: userId } }
    );
    if (user) return user;
    else return null;
  } catch (error) {
    return null;
  }
};
exports.searchUser = async (name) => {
  try {
    const users = await User.find({ name: { $regex: name.toLowerCase() } });
    if (users) return users;
    else return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

exports.addUser = async () => {
  try {
    var user = new User({
      _id: mongoose.Types.ObjectId(),
      name: "Suman",
      email: "rajpal@gmail.com",
      bio: "Hey I am a tech gig",
      mobileNumber: 9993357087,
      followers: [],
    });

    user = await user.save();
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};
/**
 * @author Prateek Dubey
 * This method register the new user
 */
exports.registerUser = async (user) => {
  try {
    var user = new User({
      _id: user.id,
      name: user.profile.firstName + " " + user.profile.lastName,
      email: user.profile.email,
      bio: "",
      followers: [],
    });

    user = await user.save();
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};

/**
 * This is to unblock the user from list
 * @author Mehul Khoiwal
 */
exports.unBlockUser = async (userId, unBlockId) => {
  try {
    const user = await User.updateOne(
      { _id: userId },
      { $pull: { blockedUsers: unBlockId } }
    );
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {}
};
/**
 * @author Mehul Khoiwal
 * This is to block the user from list
 */
exports.blockUser = async (userId, blockId) => {
  try {
    const user = await User.updateOne(
      { _id: userId },
      { $push: { blockedUsers: blockId } }
    );
    if (user) return user;
    else return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

exports.updateUser = async (user) => {
  try {
    await User.findOneAndUpdate(
      { _id: user.id },
      {
        name: user.name,
        bio: user.bio,
        mobileNumber: user.mobileNumber,
      }
    );
    if (user) return user;
    else return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

exports.findFollowers = async (id) => {
  try {
    const followers = await User.find(id).select("followers");
    console.log(followers[1]);
    if (followers) {
      const users = this.getUserById(followers);
      if (users) {
        console.log(users);
        return users;
      } else [];
    } else return [];
  } catch (error) {
    return [];
  }
};

exports.findFollowings = async (id) => {
  try {
    const followings = await User.find(id).select("followings");
    console.log(followings[1]);
    if (followings) {
      const users = this.getUserById(followings[1]);
      if (users) {
        return users;
      } else return [];
    } else return [];
  } catch (error) {
    return [];
  }
};
