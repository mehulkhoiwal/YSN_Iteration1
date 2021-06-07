/**
 * @author Mehul Khoiwal
 */
import React from "react";
import S3 from "react-aws-s3";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormInvalid: false,
      file: null,
      errors: "",
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    if (e.target.files.length) {
      let fileObj = e.target.files[0];
      let fileName = fileObj.name;
      //check for file extension and pass only if it is .jpg/png and display error message otherwise
      if (
        fileName.slice(fileName.lastIndexOf(".") + 1) === "jpg" ||
        fileName.slice(fileName.lastIndexOf(".") + 1) === "JPG" ||
        fileName.slice(fileName.lastIndexOf(".") + 1) === "JPEG" ||
        fileName.slice(fileName.lastIndexOf(".") + 1) === "jpeg" ||
        fileName.slice(fileName.lastIndexOf(".") + 1) === "png" ||
        fileName.slice(fileName.lastIndexOf(".") + 1) === "PNG"
      ) {
        this.setState({
          isFormInvalid: false,
        });
        this.setState({ file: e.target.files[0] });
      } else {
        this.setState({
          isFormInvalid: true,
        });
      }
    }
  }
  onFormSubmit(e) {
    e.preventDefault();
    // var config = {
    //   bucketName: process.env.REACT_APP_BUCKET_NAME,
    //   dirName: process.env.REACT_APP_DIR_NAME /* optional */,
    //   region: process.env.REACT_APP_REGION,
    //   accessKeyId: process.env.REACT_APP_ACCESS_ID,
    //   secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
    // };
    const config = {
      bucketName: "ysn-posts",
      region: "us-east-1",
      accessKeyId: "AKIAQVJ5FECRZ4COSG4V",
      secretAccessKey: "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",
    };
    var reactS3Client = new S3(config);
    if (this.state.file != null) {
      console.log("File---->", this.state.file);
      reactS3Client
        .uploadFile(this.state.file, "this.state.file.name")
        .then((data) => {
          console.log("Data----->" + data);
          if (data.status === 204) {
            console.log("----Success----");
          } else {
            console.log("----Failed----");
          }
        });
    }
  }
  render() {
    return (
      <div>
        <div className="container">
          <form onSubmit={this.onFormSubmit}>
            {this.state.isFormInvalid ? (
              <p style={{ color: "red" }}>
                Please select a valid .jpg/png file
              </p>
            ) : null}
            <input
              className="form-control form-control-md"
              type="file"
              onChange={this.onChange}
            />
            <div className="form-group">
              <button className="btnRegister" type="submit">
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Upload;
