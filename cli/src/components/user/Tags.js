import React from "react";
import Chip from "@material-ui/core/Chip";
import { Autocomplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import { styles } from "./../../../src/styles";
import { searchUser } from "./../../actions/userActions";
import { withStyles } from "@material-ui/core/styles";
import { withAuth } from "@okta/okta-react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import SearchIcon from "@material-ui/icons/Search";
// import { styles } from "./../../../src/styles";

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      searchedUsers: [],
    };
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange = (event, r) => {
    this.props.searchUser(event.target.value);
  };
  onTagsChange = (event, values) => {
    if (values != null) {
      this.props.history.push({
        pathname: "/userProfile",
        state: { id: values._id },
      });
    }
    return null;
  };

  onSelected = (option, value) => {
    // window.location.reload();
  };

  render() {
    const { classes } = this.props;
    console.log("props", this.props);
    var { searchedUsers } = this.props;
    if (searchedUsers === undefined) {
      searchedUsers = [];
    }
    // const { classes } = this.props;
    return (
      <div className="search-bar">
        <Autocomplete
          // getOptionSelected={(option,value) => {
          //   this.onSelected(option,value);
          // }}
          options={searchedUsers}
          getOptionLabel={(option) => option.name}
          onChange={this.onTagsChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search People"
              margin="normal"
              fullWidth
              className={classes.list}
              onChange={this.onChange}
            />
          )}
        />
      </div>
    );
  }
}

Tags.propTypes = {
  searchUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => (
  console.log("state : ", state),
  {
    searchedUsers: state.users.searchedUsers,
  }
);
export default withStyles()(
  withAuth(connect(mapStateToProps, { searchUser })(Tags))
);
