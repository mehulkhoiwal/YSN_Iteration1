/**
 * @author Prateek Dubey
 */

import { Tooltip, Button } from "@material-ui/core";
import React from "react";
import OktaAuth from "@okta/okta-auth-js";
import { withAuth } from "@okta/okta-react";
import config from "../../app.config";
import { registerUser } from "./../../actions/userActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import { confirmAlert } from "react-confirm-alert";

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      dob: "",
      password: "",
      confirmPassword: "",
      sessionToken: null,
      firstNameError: null,
      lastNameError: null,
      emailError: null,
      passwordError: null,
      isPasswordAndConfirmPasswordSame: null,
      hiddenPassword: "password",
      hiddenConfirmPassword: "password",
      initialErrors: false,
    };

    this.oktaAuth = new OktaAuth({ url: config.url });
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleShowHidePassword = this.toggleShowHidePassword.bind(this);
    this.handlePasswordValidation = this.handlePasswordValidation.bind(this);
    this.handleEmailValidation = this.handleEmailValidation.bind(this);
    this.handleFirstNameValidation = this.handleFirstNameValidation.bind(this);
    this.handleLastNameValidation = this.handleLastNameValidation.bind(this);
    // this.handleConfirmPasswordValidation = this.handleConfirmPasswordValidation.bind(this);
    this.toggleShowHideConfirmPassword =
      this.toggleShowHideConfirmPassword.bind(this);
    this.handleConfirmPasswordChange =
      this.handleConfirmPasswordChange.bind(this);
  }

  /**
   * To check user authentication
   */
  async checkAuthentication() {
    const sessionToken = await this.props.auth.getIdToken();
    if (sessionToken) {
      this.setState({ sessionToken });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  /**
   * To handle Gender change
   * @param {event} e
   */

  handleGenderChange = (e) => {
    this.setState({ gender: e.target.value });
  };
  /**
   * To handle dob change
   * @param {event} e
   */

  handleDobChange = async (e) => {
    await this.setState({ dob: e.target.value });
  };
  /**
   * To handle Firstname change
   * @param {event} e
   */

  handleFirstNameChange(e) {
    this.setState({ firstName: e.target.value });
  }
  /**
   * To handle Firstname validation
   * @param {event} e
   */

  handleFirstNameValidation(e) {
    const regex = new RegExp("^(?!\\s)(?![\\s\\S]*\\s$)[a-zA-Z\\s()-]+$");
    if (!regex.test(e.target.value)) {
      this.setState({ firstNameError: true });
    } else {
      this.setState({ firstNameError: false });
    }
  }

  /**
   * To handle Lastname change
   * @param {event} e
   */
  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }
  /**
   * To handle Lastname validation
   * @param {event} e
   */
  handleLastNameValidation(e) {
    const regex = new RegExp("^(?!\\s)(?![\\s\\S]*\\s$)[a-zA-Z\\s()-]+$");
    if (!regex.test(e.target.value)) {
      this.setState({ lastNameError: true });
    } else {
      this.setState({ lastNameError: false });
    }
  }

  /**
   * To handle Email change
   * @param {event} e
   */
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  /**
   * To handle Email validation
   * @param {event} e
   */
  handleEmailValidation(e) {
    const regex = new RegExp(
      '^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
    );
    if (!regex.test(e.target.value)) {
      this.setState({ emailError: true });
    } else {
      this.setState({ emailError: false });
    }
  }

  /**
   * To handle Password change
   * @param {event} e
   */
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  /**
   * To handle Password validation
   * @param {event} e
   */
  handlePasswordValidation(e) {
    const regex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (!regex.test(e.target.value)) {
      this.setState({ passwordError: true });
    } else {
      this.setState({ passwordError: false });
    }
  }

  /**
   * To handle confirmPassword change
   * @param {event} e
   */
  handleConfirmPasswordChange(e) {
    if (this.state.password === e.target.value) {
      this.setState({ isPasswordAndConfirmPasswordSame: true });
    } else {
      this.setState({ isPasswordAndConfirmPasswordSame: false });
    }
    this.setState({ confirmPassword: e.target.value });
  }

  /**
   * To handle register form submit
   * @param {event} e
   */

  async handleSubmit(e) {
    e.preventDefault();
    if (
      this.state.firstName == "" &&
      this.state.lastName == "" &&
      this.state.email == "" &&
      this.state.password == "" &&
      this.state.gender == "" &&
      this.state.dob
    ) {
      confirmAlert({
        title: "Fill the form",
        message: "Kindly fill the form before submiting it !",
        buttons: [
          {
            label: "Ok",
            onClick: null,
          },
        ],
      });
    } else if (this.state.password === this.state.confirmPassword) {
      await this.props.registerUser(
        JSON.stringify(this.state),
        this.props.history
      );
      this.setState({ initialErrors: true });
    }
  }
  /**
   * This is to toggle password hide or show
   */
  toggleShowHidePassword() {
    this.setState({ hiddenPassword: !this.state.hiddenPassword });
  }
  /**
   * This is to toggle confirmpassword hide or show
   */
  toggleShowHideConfirmPassword() {
    this.setState({ hiddenConfirmPassword: !this.state.hiddenConfirmPassword });
  }
  render() {
    const tooltipTitle =
      "Be at least 8 character Have at least one number Have at least one symbolHave at least one upper case letter Have at least one lower case letter";
    if (this.state.sessionToken) {
      this.props.auth.redirect({ sessionToken: this.state.sessionToken });
      return null;
    }
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
                    src={require("../../assests/images/register.jpg")}
                    className="image"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card2 card border-0 px-4 py-5">
                {/**<h4 className="d-flex justify-content-center mt-2">Login</h4> */}
                <form onSubmit={this.handleSubmit}>
                  <div className="row px-3">
                    <label className="mb-1">
                      <h6 className="mb-0 text-sm">Email Address</h6>
                    </label>

                    <input
                      // name="email"
                      placeholder="Enter a valid email address"
                      onBlur={this.handleEmailValidation}
                      type="email"
                      id="username"
                      value={this.state.email}
                      onChange={this.handleEmailChange}
                    />
                    {this.state.emailError !== null ? (
                      this.state.emailError == true ? (
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

                    {(() => {
                      if (
                        this.props.error?.errorCode === "E0000001" &&
                        this.state.initialErrors === true
                      ) {
                        return (
                          <p style={{ color: "red" }}>
                            Email is already registered
                          </p>
                        );
                      }
                    })()}
                    {
                      <p style={{ color: "red" }}>
                        {this.props.error[1]?.email}
                      </p>
                    }
                  </div>
                  <div className="row px-3 mt-3">
                    <label className="mb-1">
                      <h6 className="mb-0 text-sm">First Name</h6>
                    </label>
                    <input
                      // name="email"
                      placeholder="Enter Your First Name"
                      onBlur={this.handleFirstNameValidation}
                      type="text"
                      id="firstName"
                      value={this.state.firstName}
                      onChange={this.handleFirstNameChange}
                    />
                    {this.state.firstNameError !== null ? (
                      this.state.firstNameError == true ? (
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
                        {this.props.error[2]?.firstName}
                      </p>
                    }
                  </div>
                  <div className="row px-3 mt-3">
                    <label className="mb-1">
                      <h6 className="mb-0 text-sm">Last Name</h6>
                    </label>
                    <input
                      // name="email"
                      placeholder="Enter Your Last Name"
                      onBlur={this.handleLastNameValidation}
                      type="text"
                      id="lastName"
                      value={this.state.lastName}
                      onChange={this.handleLastNameChange}
                    />
                    {this.state.lastNameError !== null ? (
                      this.state.lastNameError == true ? (
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
                        {this.props.error[3]?.lastName}
                      </p>
                    }
                  </div>

                  <div className="row px-3 mt-3 mb-4 gender-select">
                    <label className="mb-1">
                      <h6 className="mb-0 text-sm">Gender</h6>
                    </label>
                    <select
                      placeholder="Select Gender"
                      class="form-select"
                      onChange={this.handleGenderChange}
                      name="gender"
                      value={this.state.gender}
                    >
                      <option selected>Select Gender</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="O">Other</option>
                    </select>
                  </div>

                  <div className="row pl-2 ">
                    <label className="mb-1">
                      <h6 className="mb-0 pl-2 text-sm">Select DOB</h6>
                    </label>
                    <div>
                      <input
                        name="dob"
                        type="date"
                        value={this.state.dob}
                        onChange={this.handleDobChange}
                      />
                    </div>
                  </div>

                  <div className="row px-3 my-3 mt-4">
                    <label className="mb-1">
                      <h6 className="mb-0 text-sm">Password</h6>
                    </label>
                    <div className="inputWithButton">
                      <i
                        className="fa fa-info button-info-text"
                        aria-hidden="true"
                        title="Be at least 8 characters
                        Have at least one number
                        Have at least one symbol
                        Have at least one upper case letter
                        Have at least one lower case letter"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                      ></i>
                      <input
                        type={this.state.hiddenPassword ? "password" : "text"}
                        placeholder="Enter password"
                        onBlur={this.handlePasswordValidation}
                        id="password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                      />

                      {this.state.hiddenPassword ? (
                        <i
                          className="fa fa-eye"
                          id="togglePassword"
                          aria-hidden="true"
                          onClick={this.toggleShowHidePassword}
                        ></i>
                      ) : (
                        <i
                          className="fa fa-eye-slash"
                          id="togglePassword"
                          aria-hidden="true"
                          onClick={this.toggleShowHidePassword}
                        ></i>
                      )}

                      {this.state.passwordError !== null ? (
                        this.state.passwordError == true ? (
                          <i
                            className="fa fa-times passwordWrongIcon"
                            aria-hidden="true"
                          ></i>
                        ) : (
                          <i
                            className="fa fa-check passwordCorrectIcon"
                            aria-hidden="true"
                          ></i>
                        )
                      ) : null}
                    </div>

                    {
                      <p style={{ color: "red", paddingRight: "6%" }}>
                        {this.props.error[0]?.password}
                      </p>
                    }
                  </div>
                  <div className="row px-3 my-3">
                    <label className="mb-1">
                      <h6 className="mb-0 text-sm">Confirm Password</h6>
                    </label>
                    <div className="inputWithButton">
                      <i
                        className="fa fa-info  button-info-text"
                        aria-hidden="true"
                        title="Your password should be same as above"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                      ></i>
                      <input
                        type={
                          this.state.hiddenConfirmPassword ? "password" : "text"
                        }
                        placeholder="Enter password again"
                        id="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={this.handleConfirmPasswordChange}
                      />
                      {this.state.hiddenConfirmPassword ? (
                        <i
                          className="fa fa-eye"
                          id="togglePassword"
                          aria-hidden="true"
                          onClick={this.toggleShowHideConfirmPassword}
                        ></i>
                      ) : (
                        <i
                          className="fa fa-eye-slash"
                          id="togglePassword"
                          aria-hidden="true"
                          onClick={this.toggleShowHideConfirmPassword}
                        ></i>
                      )}
                      {this.state.isPasswordAndConfirmPasswordSame !== null ? (
                        this.state.isPasswordAndConfirmPasswordSame == false ? (
                          <i
                            className="fa fa-times passwordWrongIcon"
                            aria-hidden="true"
                          ></i>
                        ) : (
                          <i
                            className="fa fa-check passwordCorrectIcon"
                            aria-hidden="true"
                          ></i>
                        )
                      ) : null}
                    </div>
                  </div>
                  <div className="row mb-3 px-3">
                    {(() => {
                      var showButton = true;
                      if (
                        this.state.firstNameError != null &&
                        this.state.lastNameError != null &&
                        this.state.passwordError != null &&
                        this.state.emailError != null
                      ) {
                        if (this.state.firstNameError == true) {
                          showButton = false;
                        }
                        if (this.state.lastNameError == true) {
                          showButton = false;
                        }
                        if (this.state.emailError == true) {
                          showButton = false;
                        }
                        if (this.state.passwordError == true) {
                          showButton = false;
                        }
                        if (this.state.password != this.state.confirmPassword) {
                          showButton = false;
                        }

                        if (showButton) {
                          return (
                            <button
                              type="submit"
                              className="btn btn-blue text-center"
                            >
                              Register
                            </button>
                          );
                        } else {
                          return (
                            <button
                              disabled
                              type="submit"
                              className="btn btn-blue text-center"
                            >
                              Register
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
                            Register
                          </button>
                        );
                      }
                    })()}
                  </div>
                </form>
                <div className="row mb-4 px-1">
                  <small className="font-weight-bold">
                    Already have an account?{" "}
                    <Link to="/login" className="text-danger ">
                      Login
                    </Link>
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-blue py-4">
            <div className="row px-3">
              <small className="d-flex justify-content-center">
                Copyright &copy; {new Date().getFullYear()}. All rights
                reserved.
              </small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
RegistrationForm.propTypes = {
  registerUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => (
  console.log("state,", state),
  {
    error: state.errors,
  }
);
export default withAuth(
  connect(mapStateToProps, { registerUser })(RegistrationForm)
);
