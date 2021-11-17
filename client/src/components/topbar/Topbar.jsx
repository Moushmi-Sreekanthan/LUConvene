import "./topbar.css";
import { Search, Person, Chat, Notifications, Close } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router";

export default function Topbar({ searchUserList, searchCall }) {
  const history = useHistory();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [searchValue, setSearchValue] = useState("");
  const [userList, setUserList] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const { user } = useContext(AuthContext);

  const _handleKeyDown = async (e) => {
    setShowSearch(true);
    console.log();
    if (e.key === "Enter") {
      searchCall(searchValue);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const onClickChat = () => {
    setUserList([]);
    history.push("/messenger");
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchValue.length);
      if (searchValue.length > 0) {
        searchCall(searchValue);
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  useEffect(() => {
    if (searchUserList && searchUserList.data) {
      setUserList(searchUserList.data);
    }
  }, [searchUserList]);

  const _handleCloseBtn = () => {
    setUserList([]);
    setSearchValue("");
  };
  console.log("searchUserList=====>", searchUserList);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">LUConvene</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            type="text"
            value={searchValue}
            // onKeyDown={_handleKeyDown}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search for friend"
            className="searchInput"
          />
          <Close
            className="searchIcon"
            onClick={() => _handleCloseBtn()}
            className="closeBtn"
          />
        </div>
      </div>
      {userList.length > 0 && showSearch && (
        <div className="searchList">
          <ul className="userlist">
            {userList.map((item) => (
              <Link
                onClick={() => {
                  setUserList([]);
                  setShowSearch(false);
                }}
                to={`/profile/${item._id}/${item.username}`}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <div className="userListItem">
                    <img
                      src={
                        item.profilePicture
                          ? PF + item.profilePicture
                          : PF + "person/noAvatar.png"
                      }
                      alt=""
                      className="topbarImg"
                    />
                    <span className="userName"> {item.username} </span>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem" onClick={() => onClickChat()}>
            <Chat />
          </div>
        </div>
        <Link to={`/profile/${user._id}/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
        <span className="userNameTop">{user.username}</span>
        <div className="topbarLinks" onClick={() => logout()}>
          <span className="topbarLink">Logout</span>
        </div>
      </div>
    </div>
  );
}
