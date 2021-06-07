/**
 * @author Prateek Dubey
 */
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ClearIcon from "@material-ui/icons/Clear";
import RemoveIcon from "@material-ui/icons/Remove";
import { withAuth } from "@okta/okta-react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import {
  blockUser,
  unblockUser,
  getUser,
  unfollowUser,
  followUser,
  getLoggedInUser,
  isUserFollowing,
  isUserBlocked,
} from "./../../actions/userActions";
import PhoneEnabledOutlinedIcon from "@material-ui/icons/PhoneEnabledOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";

const useStyles = (theme) => ({
  button: {
    margin: "-25px 10px 0px 0px",
  },
  name: {
    margin: "4px 0px 0px 135px",
  },
});

class ViewUserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isFollowing: false,
      isFollow: true,
      isBlock: false,
    };
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  /**
   * To get user from authentication object
   */
  async getCurrentUser() {
    await this.props.auth.getUser().then((user) => this.setState({ user }));
    this.props.getLoggedInUser(this.state.user.sub);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.c != null && this.props.c != prevProps.c) {
      this.props.auth.getUser().then((user) => {
        if (this.props.c === user.sub) {
          this.props.history.push({
            pathname: "/timeline",
          });
        } else this.props.getUser(this.props.history.location.state.id);
      });
    }
    return null;
  }

  async componentDidMount() {
    await this.getCurrentUser();
    if (this.props.history.location.state === undefined) return null;
    console.log("-test--", this.props.history.location.state.id);
    await this.props.getUser(this.props.history.location.state.id);
    this.props.isUserFollowing(
      this.props.loggedInUser,
      this.props.history.location.state.id
    );
    this.props.isUserBlocked(
      this.props.loggedInUser,
      this.props.history.location.state.id
    );
    // this.props.history.location.state.id
  }
  /**
   * This method is to block user
   */
  blockUser = () => {
    console.log("triggred");
    const c = !this.state.isFollow;
    this.setState({ isFollow: c, isBlock: !this.state.isBlock });
    this.props.unfollowUser(
      this.props.history.location.state.id,
      this.state.user.sub
    );
    return;
    this.props.blockUser(
      this.props.history.location.state.id,
      this.state.user.sub
    );
  };

  /**
   * This method is to unblock user
   */
  unblockUser = () => {
    console.log("triggred");
    this.props.unblockUser(
      this.props.history.location.state.id,
      this.state.user.sub
    );
  };
  /**
   * This method is to follow user
   */
  followUser = () => {
    console.log("followUser triggred");
    this.props.followUser(
      this.props.history.location.state.id,
      this.state.user.sub
    );
  };
  /**
   * This method is to unfollow user
   */
  unfollowUser = () => {
    console.log("triggred");
    this.props.unfollowUser(
      this.props.history.location.state.id,
      this.state.user.sub
    );
  };
  render() {
    console.log("view user", this.props.c);
    const { classes } = this.props;
    console.log(classes);
    const { user } = this.props;
    const { loggedInUser } = this.props;
    console.log("logged in prop:", this.props.loggedInUser?.following);
    console.log("friend prop :", user);
    let b = null;
    if (this.state.isFollow) {
      b = this.props?.isFollowing ? (
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<RemoveIcon />}
          onClick={this.unfollowUser}
        >
          Unfollow
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={this.followUser}
        >
          Follow
        </Button>
      );
    }
    return (
      <div className="profile-page">
        <div className="page-header header-filter" data-parallax="true"></div>
        <div className="main main-raised">
          <div className="profile-content">
            <div className="container">
              <div className="row">
                <div className="col-md-6 ml-auto mr-auto">
                  <div className="profile">
                    <div className="avatar">
                      {user?.gender == "M" ? (
                        <img
                          src={require("../../assests/images/admin_profile.png")}
                          alt="Circle Image"
                          className="img-raised rounded-circle img-fluid"
                        />
                      ) : (
                        <img
                          src={require("../../assests/images/women_profile.png")}
                          alt="Circle Image"
                          className="img-raised rounded-circle img-fluid"
                        />
                      )}
                    </div>

                    <div className="name">
                      <h3 className="title">{user?.name}</h3>
                      <h6 className="text-lowercase">
                        <EmailOutlinedIcon fontSize="small" /> {user?.email}
                      </h6>
                      <h6 className="text-lowercase">
                        {user?.mobileNumber == undefined ? (
                          ""
                        ) : (
                          <PhoneEnabledOutlinedIcon fontSize="small" />
                        )}{" "}
                        {user?.mobileNumber}
                      </h6>
                      <div className="row">
                        <div className="col-6">
                          {" "}
                          <h6 className="float-right">
                            {user?.following?.length} Followings
                          </h6>
                        </div>
                        <div className="col-6">
                          {" "}
                          <h6 className="float-left">
                            {user?.followers?.length} Followers
                          </h6>
                        </div>
                      </div>

                      <div className="button-row">
                        {b}
                        <Button
                          variant="contained"
                          size="small"
                          color="default"
                          className={classes.button}
                          startIcon={<ChatBubbleOutlineIcon />}
                        >
                          Chat
                        </Button>

                        {this.state?.isBlock ? (
                          <Button
                            variant="contained"
                            size="small"
                            color="secondary"
                            className={classes.button}
                            startIcon={<ClearIcon />}
                            onClick={this.blockUser}
                          >
                            Unblock
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            size="small"
                            color="secondary"
                            className={classes.button}
                            startIcon={<ClearIcon />}
                            onClick={this.blockUser}
                          >
                            Block
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="description text-center">
                <p>{user?.bio}</p>
              </div>

              <div className="tab-content tab-space">
                <div
                  className="tab-pane active text-center gallery"
                  id="studio"
                >
                  <div className="row">
                    <div className="col-md-3 ml-auto">
                      <img
                        src="https://c0.wallpaperflare.com/preview/415/698/497/laptop-workspace-home-office-office.jpg"
                        className="rounded"
                      />
                      <img
                        src="https://c0.wallpaperflare.com/preview/415/698/497/laptop-workspace-home-office-office.jpg"
                        className="rounded"
                      />
                    </div>
                    <div className="col-md-3 mr-auto">
                      <img
                        src="https://c0.wallpaperflare.com/preview/415/698/497/laptop-workspace-home-office-office.jpg"
                        className="rounded"
                      />
                      <img
                        src="https://c0.wallpaperflare.com/preview/415/698/497/laptop-workspace-home-office-office.jpg"
                        className="rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ViewUserProfile.propTypes = {
  getUser: PropTypes.func.isRequired,
  blockUser: PropTypes.func.isRequired,
  unblockUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  getLoggedInUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => (
  console.log("state: ", state),
  {
    user: state.users.user,
    loggedInUser: state.users.loggedInUser,
    isFollowing: state.users.isFollowing,
    isBlock: state.users.isBlock,
  }
);
export default withStyles(useStyles)(
  withAuth(
    connect(mapStateToProps, {
      getUser,
      blockUser,
      unblockUser,
      unfollowUser,
      followUser,
      getLoggedInUser,
      isUserFollowing,
      isUserBlocked,
    })(ViewUserProfile)
  )
);
