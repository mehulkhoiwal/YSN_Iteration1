const validator = require("express-joi-validation").createValidator({
  passError: true,
});
const userController = require("../controllers/userController");
const jwtAuthenticationMiddleware = require("../auth");
const loginSchema = require("../util/validator");
module.exports = (router) => {
  router.get(
    "/user/:id",
    jwtAuthenticationMiddleware,
    userController.getUserProfile
  );
  router.post(
    "/user/follow",
    jwtAuthenticationMiddleware,
    userController.followUser
  );
  router.post(
    "/user/search",
    jwtAuthenticationMiddleware,
    userController.searchUser
  );
  router.post("/", userController.registerUser);
  router.post(
    "/user/unblock",
    jwtAuthenticationMiddleware,
    userController.unBlockUser
  );
  router.post(
    "/user/block",
    jwtAuthenticationMiddleware,
    userController.blockUser
  );
  router.post(
    "/user/unFollow",
    jwtAuthenticationMiddleware,
    userController.unFollowUser
  );
  router.post(
    "/user/updateProfile",
    jwtAuthenticationMiddleware,
    userController.updateProfile
  );
  router.post(
    "/user/getFollowers",
    jwtAuthenticationMiddleware,
    userController.getFollowers
  );
  router.post(
    "/user/getFollowings",
    jwtAuthenticationMiddleware,
    userController.getFollowings
  );
};
