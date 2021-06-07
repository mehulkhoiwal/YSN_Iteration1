/**
 * @author Mehul Khoiwal
 */

import React from "react";
import OktaAuth from "@okta/okta-auth-js";
import { withAuth } from "@okta/okta-react";
import { cloneNode } from "@babel/types";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

export default withAuth(
  class LoginForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        sessionToken: null,
        errorCode: null,
        errorMessage: "",
        username: "",
        password: "",
        hiddenPassword: "password",
      };

      this.oktaAuth = new OktaAuth({ url: props.baseUrl });
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleUsernameChange = this.handleUsernameChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.toggleShowHidePassword = this.toggleShowHidePassword.bind(this);
    }

    /**
     * To handle login form
     * @param {event} e
     */
    handleSubmit(e) {
      e.preventDefault();
      if (this.state.username == "" && this.state.password == "") {
        confirmAlert({
          title: "Fill the credentials",
          message: "Kindly fill the credentials before submiting it !",
          buttons: [
            {
              label: "Ok",
              onClick: null,
            },
          ],
        });
      } else {
        this.oktaAuth
          .signIn({
            username: this.state.username,
            password: this.state.password,
          })
          .then(async (res) => {
            this.setState({
              sessionToken: res.sessionToken,
            });
          })
          .catch((err) => {
            this.setState({ errorCode: err.errorCode });
            console.log(err.statusCode + " errorCode", err);
          });
      }
    }

    /**
     * To handle Username change
     * @param {event} e
     */
    handleUsernameChange(e) {
      this.setState({ username: e.target.value, errorCode: "" });
    }

    /**
     * To handle Password change
     * @param {event} e
     */
    handlePasswordChange(e) {
      this.setState({ password: e.target.value, errorCode: "" });
    }
    /**
     * This is to toggle password hide or show
     */
    toggleShowHidePassword() {
      this.setState({ hiddenPassword: !this.state.hiddenPassword });
    }
    render() {
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
                      src={require("../../assests/images/login.jpg")}
                      className="image"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card2 card border-0 px-4 py-5 mt-5">
                  {/**<h4 className="d-flex justify-content-center mt-2">Login</h4> */}
                  <form onSubmit={this.handleSubmit}>
                    {(() => {
                      switch (this.state.errorCode) {
                        case "E0000004":
                          return (
                            <p style={{ color: "red" }}>Invalid Credentials!</p>
                          );
                      }
                    })()}
                    <div className="row px-3">
                      <label className="mb-1">
                        <h6 className="mb-0 text-sm">Email Address</h6>
                      </label>
                      <input
                        className="mb-4"
                        // name="email"
                        placeholder="Enter a valid email address"
                        type="email"
                        id="username"
                        value={this.state.username}
                        onChange={this.handleUsernameChange}
                      />
                    </div>
                    <div className="row px-3">
                      <label className="mb-1">
                        <h6 className="mb-0 text-sm">Password</h6>
                      </label>
                      <div className="inputWithButton">
                        <input
                          type={this.state.hiddenPassword ? "password" : "text"}
                          // name="password"
                          placeholder="Enter password"
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
                      </div>
                    </div>
                    <div className="row px-1 mb-4 mt-1">
                      {/* <a href="#" className="ml-auto mb-0 text-sm">
                        Forgot Password?
                      </a> */}
                    </div>
                    <div className="row mb-3 px-3">
                      <button
                        type="submit"
                        className="btn btn-blue text-center"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                  <div className="row mb-4 px-1">
                    <small className="font-weight-bold">
                      Don't have an account?{" "}
                      <Link to="/register" className="text-danger ">
                        Register
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
);
