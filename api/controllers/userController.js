const userDao = require("../daos/userDao");
const oktaClient = require("../util/oktaClient");

/**
 * 
 * @param {obj} req 
 * @param {obj} res 
 */
exports.getUserProfile = async (req, res) => {
  const { id } = req.params;

  const user = await userDao.getUserById(id);
  if (user) {
    res.status(200).send({ data: user });
  } else {
    res.status(400).send({ message: "Invalid id" });
  }
};

/**
 * This is to follow the user
 * @author Prateek Dubey
 */
exports.followUser = async (req, res) => {
  //assuming that we will get userId from okta login
  const { followId, userId } = req.body;
  const user = await userDao.getUserById(followId);
  if (user) {
    const userFollowed = await userDao.addFollowing(userId, followId);
    await userDao.addFollowers(userId, followId);
    if (userFollowed)
      res.status(200).send({ message: "User added to followed list" });
    else
      res.status(400).send({ message: "Facing some issues in following user" });
  } else {
    res.status(400).send({ message: "Invalid id" });
  }
};


/**
 * 
 * @param {obj} req 
 * @param {obj} res 
 * @returns 
 */
exports.searchUser = async (req, res) => {
  const { name } = req.body;
  var users = [];
  users = await userDao.searchUser(name);
  return res.status(200).send({ data: users });
};

/**
 * This is to unfollow the user
 * @author Prateek Dubey
 */
exports.unFollowUser = async (req, res) => {
  //assuming that we will get userId from okta login
  const { unFollowId, userId } = req.body;
  const user = await userDao.getUserById(unFollowId);
  console.log(user);
  if (user) {
    const unfollowedUser = await userDao.removeFollowing(userId, unFollowId);
    await userDao.removeFollowers(userId, unFollowId);
    if (unfollowedUser)
      res.status(200).send({ message: "User unfollowed successfully" });
    else
      res
        .status(400)
        .send({ message: "Facing some issues in unfollowing user" });
  } else {
    res.status(400).send({ message: "Invalid id" });
  }
};

/**
 * @author Prateek Dubey
 * This method is to register the user
 */
exports.registerUser = async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const errorOccurred = false;
  const regexForPassword =
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})";
  // const regexForEmail = "/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/";
  const regexForName = "^(?!\\s)(?![\\s\\S]*\\s$)[a-zA-Z0-9\\s()-]+$";

  if (
    !req.body.password.match(regexForPassword) ||
    !req.body.firstName.match(regexForName) ||
    !req.body.lastName.match(regexForName)
  ) {
    let errors = [];
    if (!req.body.password.match(regexForPassword)) {
      errors.push({
        password:
          "Password must contain uppercase, lowercase, number, special character and length of minimum 8 character",
      });
    } else {
      errors.push({
        password: "",
      });
    }
    // if (!req.body.email.match(regexForEmail)) {
    //   errors.push({
    //     email: "Email must be a valid email address",
    //   });
    // } else {
    //   errors.push({
    //     email: "",
    //   });
    // }
    if (!req.body.firstName.match(regexForName)) {
      errors.push({
        firstName: "First name must be a valid",
      });
    } else {
      errors.push({
        firstName: "",
      });
    }
    if (!req.body.lastName.match(regexForName)) {
      errors.push({
        lastName: "Last name must be a valid",
      });
    } else {
      errors.push({
        lastName: "",
      });
    }
    res.status(400);
    res.send(errors);
  } else {
    const newUser = {
      profile: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        login: req.body.email,
      },
      credentials: {
        password: {
          value: req.body.password,
        },
      },
    };
    oktaClient
      .createUser(newUser)
      .then((user) => {
        userDao.registerUser(user);
        res.status(201);
        res.send(user);
      })
      .catch((err) => {
        res.status(400);
        res.send(err);
      });
  }
};

/**
 * This method is to unblock the user
 * @author Mehul Khoiwal
 */
exports.unBlockUser = async (req, res) => {
  const { unBlockId, userId } = req.body;
  const user = await userDao.getUserById(unBlockId);
  if (user) {
    const unBlockUser = await userDao.unBlockUser(userId, unBlockId);
    if (unBlockUser)
      res.status(200).send({ message: "User unblocks successfully" });
    else
      res
        .status(400)
        .send({ message: "Facing some issues in un-blocking user" });
  } else {
    res.status(400).send({ message: "Invalid id" });
  }
};
/**
 * @author Mehul Khoiwal
 * This method is to block the user
 */
exports.blockUser = async (req, res) => {
  const { blockId, userId } = req.body;
  const user = await userDao.getUserById(blockId);
  if (user) {
    const blockUser = await userDao.blockUser(userId, blockId);
    if (blockUser)
      res.status(200).send({ message: "User blocke successfully" });
    else
      res.status(400).send({ message: "Facing some issues in blocking user" });
  } else {
    res.status(400).send({ message: "Invalid id" });
  }
};

exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const updatedUser = await userDao.updateUser(req.body);
  if (updatedUser)
    res.status(200).send({ message: "User pofile updated successfully" });
  else res.status(400).send({ message: "Facing some issues in blocking user" });
};

exports.getFollowers = async (req, res) => {
  const { userId } = req.body;
  const followers = await userDao.findFollowers(userId);
  console.log(followers);
  return res.status(200).send({ data: followers });
};

exports.getFollowings = async (req, res) => {
  const { userId } = req.body;
  followings = await userDao.findFollowings(userId);
  return res.status(200).send({ data: followings });
};
