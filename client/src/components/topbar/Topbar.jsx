import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";


export default function Topbar({searchUserList, searchCall}) {

  const [searchValue, setSearchValue] = useState('');

  const { user } = useContext(AuthContext);
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const _handleKeyDown = async (e) => {
    //e.preventDefault();
   console.log();
    if (e.key === 'Enter') {
      searchCall(searchValue) 
    }
  }

  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
}

  // useEffect(()=>{
  //   setUserList(searchUserList)
  // },[searchUserList])
  // console.log("target=====", searchUserList)

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
            // onChange={e => setSearch(e.target.value)}
            onKeyDown={_handleKeyDown}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search for friend"
            className="searchInput"
          />
        </div>
      
      </div>
      <div className="topbarRight">
        <div className="topbarLinks" onClick={()=>logout()}>
          <span className="topbarLink">Logout</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
          </div>
          <div className="topbarIconItem">
            <Chat />
          </div>
        </div>
        <Link 
        to={`/profile/${user.username}`}
        >
          <img
            src="/assets/person/noAvatar.png"
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
