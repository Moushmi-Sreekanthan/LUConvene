// import "./profile.css";
// import Topbar from "../../components/topbar/Topbar";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Rightbar from "../../components/rightbar/Rightbar";
// import Feed from "../../components/feed/Feed";
// import { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { useParams } from "react-router";
// import { AuthContext } from "../../context/AuthContext";

// export default function Profile({}) {
//  // const { user } = useContext(AuthContext);

//   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
//   const [user, setUser] = useState(useContext(AuthContext));
//   const username = useParams().username;
// console.log("useParams===",useParams());
//   useEffect(() => {
//     const fetchUser = async () => {
//       const res = await axios.get(`/users/${user._id}`);
//       setUser(res.data);
//     };
//     fetchUser();
//   }, [username]);

//   return (
//     <>
//       <Topbar />
//       <div className="profile">
//         <Sidebar />
//         <div className="profileRight">
//           <div className="profileRightTop">
//             <div className="profileCover">
//               <img
//                 className="profileCoverImg"
//                 src="/assets/person/noCover.png"
//                 alt=""
//               />
//               <img
//                 className="profileUserImg"
//                 src="/assets/person/noAvatar.png"
//                 alt=""
//               />
//             </div>
//             <div className="profileInfo">
//               <h4 className="profileInfoName">{user.username}</h4>
//               <span className="profileInfoDesc">{user.desc}</span>
//             </div>
//           </div>
//           <div className="profileRightBottom">
//             <Feed username={user.username} />
//             <Rightbar user={user} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Modal from "../../components/modal/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { PermMedia } from "@material-ui/icons";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [modalInputName, setModalInputName] = useState("");
  const [file, setFile] = useState(null);

  const username = useParams().username;
  const userId = useParams().userId;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/${userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setName(value);
  };

  const handleSubmit = (e) => {
    setName(modalInputName);
    modalClose();
  };

  const modalOpen = () => {
    setModal(true);
  };

  const modalClose = () => {
    setModalInputName("");
    setModal(false);
  };

  const handleImageUpload = async (e) => {
    // const [file] = e.target.files;
    // setFile(e.target.files[0])

    // const data = new FormData();
    // const fileName = Date.now() + file.name;
    // data.append("name", fileName);
    // data.append("file", file);
    // newPost.img = fileName;
    // console.log(newPost);
    // try {
    //   await axios.post("/upload", data);
    // } catch (err) {}
  };

  return (
    <>
      <Topbar />
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
              <button className="updateButton" onClick={() => modalOpen()}>
                Update Profile
              </button>

              <Modal show={modal} handleClose={(e) => modalClose(e)}>
                <h2>Update Profile</h2>
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    type="text"
                    value={modalInputName}
                    name="modalInputName"
                    onChange={(e) => handleChange(e)}
                    className="form-control"
                  />

                  <label>Email:</label>
                  <input
                    type="text"
                    value={modalInputName}
                    name="modalInputName"
                    onChange={(e) => handleChange(e)}
                    className="form-control"
                  />

                  <label htmlFor="file" className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon" />
                    <span className="shareOptionText">{ "Photo or Video" }</span>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="file"
                      accept=".png,.jpeg,.jpg"
                      onChange={handleImageUpload}
                    />
                  </label>
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
