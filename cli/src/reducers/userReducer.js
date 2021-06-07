import {
  GET_USER_PROFILE,
  SEARCHED_USERS,
  GET_USER,
  GET_PROFILE,
  GET_LOGGED_IN_USER_PROFILE,
  UNFOLLOW_USER,
  FOLLOW_USER,
  UNBLOCK_USER,
  BLOCK_USER,
  ISFOLLOWING_USER,
} from "../actions/type";
const initialState = {};
const user = [];
const loggedInUser = [];
const users = {};
const searchedUsers = [];
const profileUser = [];
const isFollowing = null;
const initialFollowing = null;
const isBlock = null;
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        user: action.payload,
      };
    case GET_LOGGED_IN_USER_PROFILE:
      return {
        ...state,
        loggedInUser: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_PROFILE:
      return {
        ...state,
        profileUser: action.payload,
      };
    case SEARCHED_USERS:
      return {
        ...state,
        searchedUsers: action.payload,
      };
    case FOLLOW_USER:
      return {
        ...state,
        isFollowing: action.payload,
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        isFollowing: action.payload,
      };
    case BLOCK_USER:
      return {
        ...state,
        isBlock: action.payload,
      };
    case UNBLOCK_USER:
      return {
        ...state,
        isBlock: action.payload,
      };
    default:
      return state;
  }
}
