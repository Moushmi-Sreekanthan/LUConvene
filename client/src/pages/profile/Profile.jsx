import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Modal from "../../components/modal/Modal";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { PermMedia } from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";


export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);

  const [user, setUser] = useState({});
  const [modal, setModal] = useState(false);
  const [imageName, setImageName] = useState("");
  const [imageNameCover, setImageNameCover] = useState("");
  const [modalUsername, setModalUsername] = useState("");
  const [modalEmail, setModalEmail] = useState("");
  const [modalDesc, setModalDesc] = useState("");
  const [imageData, setImageData] = useState("");
  const [coverImageData, setcoverImageData] = useState("");
  const [userList, setUserList] = useState([]);

  const username = useParams().username;
  const userId = useParams().userId;

  useEffect(() => {
    const fetchUser = async () => {
    console.log("fetchUser called...");

      const res = await axios.get(`/users/${userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  const handleSubmit = async (e) => {
    console.log(
      modalUsername,
      modalEmail,
      modalDesc,
      imageName,
      imageNameCover,
      imageData,
      coverImageData
    );

    try {
      await axios.post("/upload", imageData);
      await axios.post("/upload", coverImageData);
      let response = await axios.put(`/users/${user._id}`, {
        userId: user._id,
        username: modalUsername ? modalUsername : user.username,
        email: modalEmail ? modalEmail : user.email,
        desc: modalDesc ? modalDesc : user.desc || "",
        profilePicture: imageName ? imageName : user.profilePicture || "",
        coverPicture: imageNameCover ? imageNameCover : user.coverPicture || "",
      });
      console.log("response", response);
      const res = await axios.get(`/users/${user._id}`);
      console.log("res", res);
      localStorage.setItem("user", JSON.stringify(res.data))

      window.location.reload();
    } catch (err) {}

    modalClose();
  };

  const modalOpen = () => {
    setModal(true);
  };

  const modalClose = () => {
    // setModalUsername(""),
    // setModalEmail(""),
    // setModalDesc(""),
    // setImageName(""),
    // setImageNameCover(""),
    // setImageData(""),
    // setcoverImageData("")
    setModal(false);
  };

  const handleImageUpload = async (e, type) => {
    const [file] = e.target.files;

    const data = new FormData();
    const fileName = Date.now() + file.name;
    data.append("name", fileName);
    data.append("file", file);
    console.log("data", data);

    if (type === "profile") {
      setImageName(fileName);
      setImageData(data);
    } else if (type === "cover") {
      setImageNameCover(fileName);
      setcoverImageData(data);
    }
  };

  return (
    <>
      <Topbar setUserList={setUserList} />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />

              {user.username === currentUser.username && (
                <button className="updateButton" onClick={() => modalOpen()}>
                  Update Profile
                </button>
              )}

              <Modal show={modal} handleClose={(e) => modalClose(e)}>
                <h2 className="modalTitle">Update Profile</h2>
                <div className=".form-control">
                  <label>Username:</label>
                  <input
                    placeholder="Enter Username"
                    type="text"
                    value={modalUsername}
                    name="modalInputName"
                    onChange={(event) => setModalUsername(event.target.value)}
                    className="form-control"
                  />

                  <label>Email:</label>
                  <input
                    placeholder="Enter Email"
                    type="text"
                    value={modalEmail}
                    name="modalInputName"
                    onChange={(event) => setModalEmail(event.target.value)}
                    className="form-control"
                  />

                  <label>Description:</label>
                  <input
                    placeholder="Enter Description"
                    type="text"
                    value={modalDesc}
                    name="modalInputName"
                    onChange={(event) => setModalDesc(event.target.value)}
                    className="form-control"
                  />

                  <div className="formPic">
                    <label htmlFor="file" className="shareOption">
                      <PermMedia htmlColor="tomato" className="shareOption" />
                      <span className="shareOptionText">{imageName}</span>
                      <span className="shareOptionText">
                        {"Select Profile Picture"}
                      </span>

                      <input
                        style={{ display: "none" }}
                        type="file"
                        id="file"
                        accept=".png,.jpeg,.jpg"
                        onChange={(e) => handleImageUpload(e, "profile")}
                      />
                    </label>
                  </div>

                  <div classNames="form-control">
                    <label htmlFor="file1" className="shareOption">
                      <PermMedia htmlColor="tomato" className="shareOption" />
                      <span className="shareOptionText">{imageNameCover}</span>
                      <span className="shareOptionText">
                        {"Select Cover Picture"}
                      </span>

                      <input
                        style={{ display: "none" }}
                        type="file"
                        id="file1"
                        accept=".png,.jpeg,.jpg"
                        onChange={(e) => handleImageUpload(e, "cover")}
                      />
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <button onClick={(e) => handleSubmit(e)} type="button">
                    Save
                  </button>
                </div>
              </Modal>
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
