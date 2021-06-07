import React from "react";
import { Link } from "react-router-dom";
import { withAuth } from "@okta/okta-react";
import Tags from "../user/Tags";

export default withAuth(
  class Navigation extends React.Component {
    constructor(props) {
      super(props);
      this.state = { authenticated: null };
      this.checkAuthentication = this.checkAuthentication.bind(this);
      this.checkAuthentication();
    }

    async checkAuthentication() {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    }

    componentDidUpdate() {
      this.checkAuthentication();
    }

    render() {
      if (this.state.authenticated === null) return null;
      const authNav = this.state.authenticated ? (
        <ul class="navbar-nav nav-bar-links ">
          <li class="nav-item ">
            <Tags history={this.props.history} />
          </li>
          <div class="dropdown mt-1">
            <img
              src={require("../../assests/images/admin_profile.png")}
              className="profileIcon"
            />
            <div class="dropdown-content">
              <Link class=" text-dark" to="/timeline">
                Profile
              </Link>
              <a
                href="javascript:void(0)"
                onClick={() => this.props.auth.logout()}
                class=" text-dark"
              >
                Logout
              </a>
            </div>
          </div>
        </ul>
      ) : (
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 nav-bar-home-links">
          <li class="nav-item">
            <Link
              to="/"
              onClick={() => this.props.auth.login()}
              class="nav-link"
            >
              Login
            </Link>
          </li>
          <li class="nav-item">
            <Link to="/register" class="nav-link">
              Register
            </Link>
          </li>
        </ul>
      );
      return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            {this.state.authenticated ? (
              <Link class="navbar-brand" to="/dashboard">
                Yash Social Network
              </Link>
            ) : (
              <Link class="navbar-brand" to="/">
                Yash Social Network
              </Link>
            )}
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon" />
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              {authNav}
            </div>
          </div>
        </nav>
      );
    }
  }
);
