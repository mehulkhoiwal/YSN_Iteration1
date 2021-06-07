/**
 * @author Mehul Khoiwal
 */

import React from "react";
import { withAuth } from "@okta/okta-react";
import { getUser } from "./../../actions/userActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import PhoneEnabledOutlinedIcon from "@material-ui/icons/PhoneEnabledOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  /**
   * To get user from authentication object
   */
  async getCurrentUser() {
    await this.props.auth.getUser().then((user) => this.setState({ user }));
    console.log("user from did:", this.state.user);
  }

  async componentDidMount() {
    await this.getCurrentUser();
    this.props.getUser(this.state.user.sub);
  }

  render() {
    const classes = {};
    classes.name = "withAuth(Connect(ViewUserProfile))-name-3";
    if (!this.state.user) return null;
    const { user } = this.props;
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
                        {user?.mobileNumber == "" ? (
                          ""
                        ) : (
                          <PhoneEnabledOutlinedIcon fontSize="small" />
                        )}{" "}
                        {user?.mobileNumber}
                      </h6>
                      <div className="row mb-2">
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
                      <Link
                        to={{
                          pathname: `/update`,
                          aboutProps: { id: this.state.user?.sub },
                        }}
                        className="text-decoration-none"
                      >
                        <Button
                          variant="contained"
                          size="small"
                          color="default"
                          startIcon={<CreateOutlinedIcon />}
                        >
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="description text-center mt-4">
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
ProfilePage.propTypes = {
  getUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => (
  console.log("state : ", state),
  {
    user: state.users.user,
  }
);
export default withAuth(
  connect(
    mapStateToProps,
    { getUser }
  )(ProfilePage)
);
