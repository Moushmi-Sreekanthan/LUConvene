import React,{useState} from 'react';
import Topbar from "../../components/topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import "./home.css"


export default function Home() {
  const [userList, setUserList] = useState([]);
  return (
    <>
      <Topbar setUserList={setUserList} />
      <div className="homeContainer">
        <Sidebar />
        <Feed userList={userList} />
        <Rightbar/>
      </div>
    </>
  );
}
