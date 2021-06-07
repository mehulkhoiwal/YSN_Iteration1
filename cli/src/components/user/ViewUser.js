/**
 * @author Prateek Dubey
 */
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ViewUserProfile from "./ViewUserProfile";

const useStyles = (theme) => ({
  root: {
    // padding: "20px 0 0 0",
    height: "100vh",
    // background: "../../assests/images/background.jpg",
  },
});

class ViewUser extends React.Component {
  render() {
    let c = null;
    if (this.props.history.location.state.id != undefined) {
      c = this.props.history.location.state.id;
    }
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ViewUserProfile history={this.props.history} c={c} />
      </div>
    );
  }
}

export default withStyles(useStyles)(ViewUser);
