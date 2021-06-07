import React, { Component } from "react";
import { Route, Router } from "react-router-dom";
import { SecureRoute, ImplicitCallback } from "@okta/okta-react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/shared/Navigation";
import RegistrationForm from "./components/auth/RegistrationForm";
import config from "./app.config";
import LoginPage from "./components/auth/LoginPage";
import ProfilePage from "./components/auth/ProfilePage";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import { Provider } from "react-redux";
import store from "./store";
import UpdateUser from "./components/user/UpdateUser";
import ViewUser from "./components/user/ViewUser";
import history from "./history";
import Upload from "./components/uploadFiles/upload";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Navigation history={history} />
          <main>
            <SecureRoute path="/update" component={UpdateUser} />
            <Route
              path="/login"
              render={() => <LoginPage baseUrl={config.url} />}
            />
            <SecureRoute exact path="/timeline" component={ProfilePage} />
            <SecureRoute exact path="/userProfile" component={ViewUser} />
            <Route path="/register" component={RegistrationForm} />
            <Route path="/addPost" component={Upload} />
          </main>
        </Router>
        <Route
          path="/"
          exact
          render={() => <LoginPage baseUrl={config.url} />}
        />
        <Route path="/implicit/callback" component={ImplicitCallback} />
        <SecureRoute path="/dashboard" component={Dashboard} />
      </Provider>
    );
  }
}
