import "./rightbar.css";
import { Users } from "../../dummyData";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import { useHistory } from "react-router";

let items = [
  { src: "assets/ad.png", desc: "Slide1" },
  { src: "assets/ad.png", desc: "Slide2" },
  { src: "assets/ad.png", desc: "Slide3" },
];

export default function Rightbar({ user }) {
  const history = useHistory();

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const state = currentUser.followings.includes(user?._id);
  const [followed, setFollowed] = useState(state);

  useEffect(() => {
    setFollowed(state);
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    console.log("handleClick called");
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  const onClickUser = async (userId) => {
    const res = await axios.get(`/users/${userId}`);
    console.log("data=>>>", res.data.username);

    window.location.href = `/profile/${res.data._id}/${res.data.username}`;

    //history.push(`/profile/${res.data.username}`);

    // setUser(res.data);
    //  <Link
    //     to={`/profile/${user.username}`}
    //     >

    //     </Link>
  };

  const HomeRightbar = () => {
    return (
      <>
        <div style={{ display: "block", width: 500, padding: 30, height: 500 }}>
          <Carousel>
            <Carousel.Item interval={3000}>
              <img
                className="d-block w-100"
                src="assets/images/event.PNG"
                alt="Image "
              />
            </Carousel.Item>
            <Carousel.Item interval={3000}>
              <img
                className="d-block w-100"
                src="assets/images/1.PNG"
                alt="Image "
              />
            </Carousel.Item>
            <Carousel.Item interval={3000}>
              <img
                className="d-block w-100"
                src="assets/images/2.PNG"
                alt="Image "
              />
            </Carousel.Item>

            <Carousel.Item interval={3000}>
              <img
                className="d-block w-100"
                src="assets/images/ca.jpeg"
                alt="Image "
              />
            </Carousel.Item>
            <Carousel.Item interval={3000}>
              <img
                className="d-block w-100"
                src="assets/images/jc.jpg"
                alt="Image "
              />
            </Carousel.Item>
            <Carousel.Item interval={3000}>
              <img
                className="d-block w-100"
                src="assets/images/6.PNG"
                alt="Image "
              />
            </Carousel.Item>
            <Carousel.Item interval={3000}>
              <img
                className="d-block w-100"
                src="assets/images/event1.PNG"
                alt="Image "
              />
            </Carousel.Item>
           
          </Carousel>
        </div>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}

        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Username:</span>
            <span className="rightbarInfoValue">{user.username}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Email:</span>
            <span className="rightbarInfoValue">{user.email}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            // <Link
            //   to={`/profile/${friend.username}`}
            //   style={{ textDecoration: "none" }}
            // >
            <div
              className="rightbarFollowing"
              onClick={() => onClickUser(friend._id)}
            >
              <img
                src={
                  friend.profilePicture
                    ? PF + friend.profilePicture
                    : "/assets/person/noAvatar.png"
                }
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">{friend.username}</span>
            </div>
            // </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
