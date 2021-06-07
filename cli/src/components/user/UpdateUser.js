import { withStyles } from "@material-ui/core/styles";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import React from "react";
import { Component } from "react";
import { styles } from "./../../../src/styles";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getProfile, updateUser } from "./../../actions/userActions";
import { isValidPhoneNumber } from "react-phone-number-input";

class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mobileNo: "",
      bio: "",
      nameError: "",
      mobileNumberError: "",
      bioError: "",
      bioCount: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeMobileNumber = this.onChangeMobileNumber.bind(this);
    this.onChangeBio = this.onChangeBio.bind(this);
  }

  componentDidMount() {
    this.props.getProfile(this.props.location.aboutProps.id);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    const regex = new RegExp("^(?!\\s)(?![\\s\\S]*\\s$)[a-zA-Z\\s()-]+$");
    console.log(event.target.value);
    console.log(regex.test(event.target.value));
    if (!regex.test(event.target.value)) {
      this.setState({ nameError: true });
    } else {
      this.setState({ nameError: false });
    }
  }
  onChangeMobileNumber(event, a, b, c) {
    if (event.length == a.dialCode.length) {
      this.setState({ mobileNumberError: false });
      return;
    }
    this.setState({ mobileNo: event });
    console.log("+" + event + ")");
    console.log(isValidPhoneNumber("+" + event));
    if (!isValidPhoneNumber("+" + event)) {
      this.setState({ mobileNumberError: true });
    } else {
      this.setState({ mobileNumberError: false });
    }
  }

  onChangeBio(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value.length);
    if (event.target.value != null) {
      this.setState({ bioCount: event.target.value.length });
    }
    if (event.target.value.length > 150) {
      this.setState({ bioError: true });
    } else {
      this.setState({ bioError: false });
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      name: props.user.name,
      mobileNo: props.user.mobileNumber,
      bio: props.user.bio,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    console.log("onsubmit called");
    const updatedUser = {
      id: this.props.location.aboutProps.id,
      name: this.state.name,
      mobileNumber: this.state.mobileNo,
      bio: this.state.bio,
    };
    this.props.updateUser(updatedUser, this.props.history);
  }
  render() {
    const { classes } = this.props;
    const { user } = this.props;
    const { error } = this.props;
    console.log("-----this is error", error, "-------------");
    console.log("history", this.props);
    return (
      <div className="form-login container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
        <div className="card card0 border-0">
          <div className="row d-flex">
            <div className="col-lg-6">
              <div className="card1 pb-5">
                <div className="row">
                  <img
                    src={require("../../assests/images/yash-logo-new.svg")}
                    className="logo"
                  />
                </div>
                <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                  <img
                    src={require("../../assests/images/update_form2.jpg")}
                    className="image"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card2 card border-0 px-4 py-5 mt-2 mb-n1">
                <form onSubmit={this.onSubmit}>
                  <div className="row px-3 ml-1">
                    <label className="mb-1">
                      <h6 className="mb-0 text-sm">Name</h6>
                    </label>

                    <input
                      name="name"
                      placeholder="Enter a Name"
                      type="name"
                      id="name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                    {this.state.nameError !== null ? (
                      this.state.nameError == true ? (
                        <i
                          className="fa fa-times incorrectInput"
                          aria-hidden="true"
                        ></i>
                      ) : (
                        <i
                          className="fa fa-check correctInput"
                          aria-hidden="true"
                        ></i>
                      )
                    ) : null}
                    {
                      <p style={{ color: "red" }}>
                        {this.props.error[1]?.name}
                      </p>
                    }
                  </div>
                  <div className="row px-3 mt-4">
                    <label className="mb-1 ml-2">
                      <h6 className="mb-0 text-sm">Mobile Number</h6>
                    </label>
                    <div className="input-group mb-3 ml-2">
                      <PhoneInput
                        country={"in"}
                        name="mobileNo"
                        countryCodeEditable={false}
                        value={this.state.mobileNo}
                        enableSearch={false}
                        onChange={this.onChangeMobileNumber}
                        inputStyle={{
                          width: "92%",
                        }}
                      />
                    </div>
                    {this.state.mobileNumberError !== null ? (
                      this.state.mobileNumberError == true ? (
                        <i
                          className="fa fa-times incorrectInput"
                          aria-hidden="true"
                          style={{ marginLeft: "90%", marginTop: "-8%" }}
                        ></i>
                      ) : (
                        <i
                          className="fa fa-check correctInput"
                          aria-hidden="true"
                          style={{ marginLeft: "90%", marginTop: "-8%" }}
                        ></i>
                      )
                    ) : null}
                    {
                      <p style={{ color: "red" }}>
                        {this.props.error[2]?.mobileNumber}
                      </p>
                    }
                  </div>
                  <div className="row px-3  ml-1">
                    <label className="mb-1">
                      <h6 className="mb-0 text-sm">Bio</h6>
                    </label>
                    <textarea
                      // className="form-control"
                      aria-label="With textarea"
                      name="bio"
                      value={this.state.bio}
                      onChange={this.onChangeBio}
                    ></textarea>

                    {this.state.bioError !== null ? (
                      this.state.bioError == true ? (
                        <i
                          className="fa fa-times incorrectInput"
                          aria-hidden="true"
                        ></i>
                      ) : (
                        <i
                          className="fa fa-check correctInput"
                          aria-hidden="true"
                        ></i>
                      )
                    ) : null}
                    {
                      <p style={{ color: "red" }}>
                        {this.props.error[3]?.name}
                      </p>
                    }
                  </div>

                  <div className="row mb-3 px-3 ml-2">
                    {(() => {
                      if (!this.state.bioError) {
                        return (
                          <span className="text-success">
                            +{this.state.bioCount}
                          </span>
                        );
                      } else {
                        return (
                          <span className="text-danger">
                            -{this.state.bioCount}
                          </span>
                        );
                      }
                    })()}
                  </div>
                  <div className="row mb-3 px-3 ml-2">
                    {(() => {
                      var showButton = true;
                      if (
                        this.state.nameError != null &&
                        this.state.mobileNumberError != null &&
                        this.state.bioError != null
                      ) {
                        if (this.state.nameError == true) {
                          showButton = false;
                        }
                        if (this.state.mobileNumberError == true) {
                          showButton = false;
                        }
                        if (this.state.bioError == true) {
                          showButton = false;
                        }

                        if (showButton) {
                          return (
                            <button
                              type="submit"
                              className="btn btn-blue text-center"
                            >
                              Save
                            </button>
                          );
                        } else {
                          return (
                            <button
                              disabled
                              type="submit"
                              className="btn btn-blue text-center"
                            >
                              Save
                            </button>
                          );
                        }
                      } else {
                        return (
                          <button
                            disabled
                            type="submit"
                            className="btn btn-blue text-center"
                          >
                            Save
                          </button>
                        );
                      }
                    })()}
                  </div>

                  {/* <div className="row mb-3 px-3 pt-3">
                    <button type="submit" className="btn btn-blue text-center">
                      Update
                    </button>
                  </div> */}
                </form>
              </div>
            </div>
          </div>
          <div className="bg-blue py-4"></div>
        </div>
      </div>
    );
  }
}
UpdateUser.propTypes = {
  getUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.users.profileUser,
  error: state.errors,
});
export default withStyles(styles)(
  connect(mapStateToProps, { getProfile, updateUser })(UpdateUser)
);
