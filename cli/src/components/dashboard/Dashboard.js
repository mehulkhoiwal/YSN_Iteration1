import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = (theme) => ({
  fab: {
    width: "100%",
    maxWidth: 500,
  },
});
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    console.log("classes : ", classes);
    return (
      <div className={classes.root}>
        {console.log("classes root : ", classes.root)}
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          className="d-flex justify-content-center"
        >
          Dashboard
        </Typography>
      </div>
    );
  }
}

export default withStyles(useStyles)(Dashboard);
