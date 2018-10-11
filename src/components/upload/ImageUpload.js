import React, { Component } from "react";
import { Upload, Button, Icon, Row, Col, Spin, Card, Progress } from "antd";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
import { openNotificationWithIcon } from "../../utils/helper";

const config = {
  apiKey: "AIzaSyCdeiQHkEsBDDxMQh9rFarKPz3dBUsHFPE",
  authDomain: "u-survey-a4512.firebaseapp.com",
  databaseURL: "https://u-survey-a4512.firebaseio.com",
  projectId: "u-survey-a4512",
  storageBucket: "u-survey-a4512.appspot.com",
  messagingSenderId: "130535044921"
};
firebase.initializeApp(config);

const writeInfoToDB = (file, url) => {
  console.log(file);
  const patr = new RegExp("image");
  const id =
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15);
  firebase
    .database()
    .ref("upload/" + id)
    .set({
      id,
      name: file.name,
      url,
      type: patr.test(file.type) ? "image" : "other"
    });
};

export default class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadFiles: [],
      isUploading: false,
      fileList: [],
      percent: 0
    };
  }

  componentDidMount() {
    const ref = firebase.database().ref("upload");
    ref.on("value", snapshot => {
      this.setState({ uploadFiles: snapshot.val() });
    });
  }

  handleUpload = () => {
    this.setState(prevState => ({ isUploading: !prevState.isUploading }));
    this.state.fileList.map(file => {
      const uploadTask = firebase
        .storage()
        .ref(`${file.name}`)
        .put(file);
      return uploadTask.on(
        "state_changed",
        snapshot => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.setState({ percent: progress });
        },
        err => {
          openNotificationWithIcon("error", null);
          this.setState({ isUploading: false });
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(
            function(downloadURL) {
              openNotificationWithIcon("success", downloadURL);
              writeInfoToDB(file, downloadURL);
              this.setState(({ fileList }) => {
                const index = fileList.indexOf(file);
                const newFileList = fileList.slice();
                newFileList.splice(index, 1);
                return {
                  fileList: newFileList,
                  isUploading: false
                };
              });
            }.bind(this)
          );
        }
      );
    });
  };

  onDeleteFile = (name, id) => {
    // Create a reference to the file to delete
    const desertRef = firebase
      .storage()
      .ref()
      .child(name);

    // Delete the file
    desertRef
      .delete()
      .then(function() {
        // File deleted successfully
        alert(`delete file ${name} successful`);
        firebase
          .database()
          .ref(`upload/${id}`)
          .remove();
      })
      .catch(function(error) {
        alert(`delete file ${name} failed`);
      });
  };

  render() {
    const { isUploading, uploadFiles, percent } = this.state;
    const props = {
      multiple: true,
      beforeUpload: file => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
          percent: 0
        }));
        return false;
      },
      fileList: this.state.fileList,
      onRemove: file => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      }
    };
    return (
      <div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" />
            {" Upload"}
          </Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={this.state.fileList.length === 0}
          loading={isUploading}
        >
          {isUploading ? "Uploading" : "Start upload"}
        </Button>
        {percent ? <Progress strokeLinecap="square" percent={percent} /> : null}
        {uploadFiles && Object.keys(uploadFiles).length > 0 ? (
          <Row type="flex">
            {Object.values(uploadFiles).map(item => {
              return (
                <Col span={6} key={item.id} style={{ padding: "20px 10px" }}>
                  <Card>
                    <div style={{ textAlign: "center", fontSize: "30px" }}>
                      {item.type === "image" ? (
                        <Icon type="picture" theme="outlined" />
                      ) : (
                        <Icon type="file" theme="outlined" />
                      )}
                    </div>
                    <span>{item.name}</span>
                    <div
                      className="file-action"
                      style={{ textAlign: "right", padding: "5px 5px" }}
                    >
                      <a target="_blank" href={item.url} alt="download">
                        <Icon
                          type="download"
                          theme="outlined"
                          style={{ marginLeft: "20px" }}
                        />
                      </a>
                      <a
                        onClick={() => this.onDeleteFile(item.name, item.id)}
                        href="#"
                      >
                        <Icon type="delete" theme="outlined" />
                      </a>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : (
          <div style={{ padding: "30px 20px", textAlign: "center" }}>
            <Spin />
          </div>
        )}
      </div>
    );
  }
}
