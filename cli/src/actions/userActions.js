import {
  GET_USER_PROFILE,
  GET_ERRORS,
  GET_PROFILE,
  GET_LOGGED_IN_USER_PROFILE,
  SEARCHED_USERS,
  UNFOLLOW_USER,
  FOLLOW_USER,
  UNBLOCK_USER,
  BLOCK_USER,
  ISFOLLOWING_USER,
} from "./type";
import axios from "axios";

/**
 * @author Prateek Dubey
 * @param {id of user to fetch user detail} id
 */
export const getUser = (id) => async (dispatch) => {
  try {
    var token = JSON.parse(localStorage.getItem("okta-token-storage"));
    const headers = {
      Authorization: "Bearer " + token.idToken.idToken,
    };
    const res = await axios.get(`http://localhost:3001/api/v1/user/${id}`, {
      headers,
    });

    console.log("Response from getUser:", res);
    dispatch({
      type: GET_USER_PROFILE,
      payload: res.data.data,
    });
  } catch (err) {
    console.log("Error occurred: ", err);
  }
};

export const getLoggedInUser = (id) => async (dispatch) => {
  var token = JSON.parse(localStorage.getItem("okta-token-storage"));
  const headers = {
    Authorization: "Bearer " + token.idToken.idToken,
  };
  const res = await axios.get(`http://localhost:3001/api/v1/user/${id}`, {
    headers,
  });

  dispatch({
    type: GET_LOGGED_IN_USER_PROFILE,
    payload: res.data.data,
  });
};
export const getProfile = (id) => async (dispatch) => {
  var token = JSON.parse(localStorage.getItem("okta-token-storage"));
  const headers = {
    Authorization: "Bearer " + token.idToken.idToken,
  };
  const res = await axios.get(`http://localhost:3001/api/v1/user/${id}`, {
    headers,
  });
  console.log(res, id);
  dispatch({
    type: GET_PROFILE,
    payload: res.data.data,
  });
};

/**
 * @author Mehul Khoiwal
 * @param {entity to register} user
 * @param {history} history
 */
export const registerUser = (user, history) => async (dispatch) => {
  try {
    await axios.post("http://localhost:3001/api/v1", user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    history.push("/login");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,

      payload: error.response.data,
    });
  }
};

/**
 * @author Prateek Dubey
 * @param {Id of user to block} blockId
 * @param {Id of logged in user} userId
 */
export const blockUser = (blockId, userId) => async (dispatch) => {
  var token = JSON.parse(localStorage.getItem("okta-token-storage"));
  const headers = {
    Authorization: "Bearer " + token.idToken.idToken,
  };
  try {
    await axios.post(
      "http://localhost:3001/api/v1/user/block",
      {
        blockId: blockId,
        userId: userId,
      },
      {
        headers,
      }
    );
    dispatch(getUser(blockId));
    dispatch({
      type: BLOCK_USER,
      payload: true,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @author Prateek Dubey
 * @param {Id of user to unblock} unBlockId
 * @param {Id of logged in user} userId
 */
export const unblockUser = (unBlockId, userId) => async (dispatch) => {
  var token = JSON.parse(localStorage.getItem("okta-token-storage"));
  const headers = {
    Authorization: "Bearer " + token.idToken.idToken,
  };
  try {
    await axios.post(
      "http://localhost:3001/api/v1/user/unblock",
      {
        unBlockId: unBlockId,
        userId: userId,
      },
      {
        headers,
      }
    );
    dispatch(getUser(unBlockId));
    dispatch({
      type: UNBLOCK_USER,
      payload: false,
    });
  } catch (error) {
    console.log(error);
  }
};

export const searchUser = (name) => async (dispatch) => {
  var token = JSON.parse(localStorage.getItem("okta-token-storage"));
  const headers = {
    Authorization: "Bearer " + token.idToken.idToken,
  };
  try {
    const res = await axios.post(
      "http://localhost:3001/api/v1/user/search",
      {
        name: name,
      },
      {
        headers,
      }
    );
    dispatch({
      type: SEARCHED_USERS,
      payload: res.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @author Mehul Khoiwal
 * @param {Id of user to follow} followId
 * @param {Id of logged in user} userId
 */
export const followUser = (followId, userId) => async (dispatch) => {
  var token = JSON.parse(localStorage.getItem("okta-token-storage"));
  const headers = {
    Authorization: "Bearer " + token.idToken.idToken,
  };
  try {
    await axios.post(
      "http://localhost:3001/api/v1/user/follow",
      {
        followId: followId,
        userId: userId,
      },
      {
        headers,
      }
    );
    dispatch(getUser(followId));
    dispatch({
      type: FOLLOW_USER,
      payload: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (user, history) => async (dispatch) => {
  var token = JSON.parse(localStorage.getItem("okta-token-storage"));

  try {
    const res = await axios.post(
      "http://localhost:3001/api/v1/user/updateProfile",
      user,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.idToken.idToken,
        },
      }
    );
    history.push("/timeline");
    console.log(res);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,

      payload: error.response.data,
    });
  }
};
/**
 * @author Mehul Khoiwal
 * @param {Id of user to unFollow} unFollowId
 * @param {Id of logged in user} userId
 */
export const unfollowUser = (unFollowId, userId) => async (dispatch) => {
  var token = JSON.parse(localStorage.getItem("okta-token-storage"));
  const headers = {
    Authorization: "Bearer " + token.idToken.idToken,
  };
  try {
    await axios.post(
      "http://localhost:3001/api/v1/user/unFollow",
      {
        unFollowId: unFollowId,
        userId: userId,
      },
      {
        headers,
      }
    );
    dispatch(getUser(unFollowId));
    dispatch({
      type: UNFOLLOW_USER,
      payload: false,
    });
  } catch (error) {
    console.log(error);
  }
};

export const isUserFollowing = (currentUser, userId) => async (dispatch) => {
  var token = JSON.parse(localStorage.getItem("okta-token-storage"));
  const headers = {
    Authorization: "Bearer " + token.idToken.idToken,
  };
  try {
    console.log("isFollowing in actions", currentUser, userId);
    for (var i = 0; i < currentUser.following.length; i++) {
      if (currentUser.following[i] === userId) {
        console.log("user following from actions");
        dispatch({
          type: FOLLOW_USER,
          payload: true,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
export const isUserBlocked = (currentUser, userId) => async (dispatch) => {
  var token = JSON.parse(localStorage.getItem("okta-token-storage"));
  const headers = {
    Authorization: "Bearer " + token.idToken.idToken,
  };
  try {
    for (var i = 0; i < currentUser.following.length; i++) {
      if (currentUser.blockedUsers[i] === userId) {
        console.log("user following from actions");
        dispatch({
          type: BLOCK_USER,
          payload: true,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
