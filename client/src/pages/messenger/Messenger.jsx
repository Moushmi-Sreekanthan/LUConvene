import "./messenger.css";
import Topbar from "../../components/topbar";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import { RssFeed, Chat } from "@material-ui/icons";
import CloseFriend from "../../components/closeFriend/CloseFriend";

export default function Messenger() {
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  const [currentFriend, setCurrentFriend] = useState({});

  const [friends, setFriends] = useState([]);
  useEffect(() => {
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

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const cId = currentChat._id ? currentChat : currentChat[0];

        const res = await axios.get("/messages/" + cId._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id ? currentChat._id : currentChat[0]._id,
    };

    const cId = currentChat._id ? currentChat : currentChat[0];
    const receiverId = cId.members.find((member) => member !== user._id);

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onClickUser = async (friend) => {
    console.log("user in chat", friend);
    setCurrentFriend(friend);
    const userData = {
      senderId: user._id,
      receiverId: friend._id,
    };
    const res = await axios.get(`/conversations/${friend._id}`);
    console.log("res get conv", res);
    setCurrentChat(res.data);

    if (res.data.length === 0) {
      const res = await axios.post("/conversations", userData);
      console.log("res post conve", res);
      setCurrentChat(res.data);
    }
  };

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="sidebar">
          <div className="sidebarWrapper">
            <ul className="sidebarList">
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <li className="sidebarListItem">
                  <RssFeed className="sidebarIcon" />
                  <span className="sidebarListItemText">Feed</span>
                </li>
              </Link>
              <Link
                to="/messenger"
                style={{ textDecoration: "none", color: "black" }}
              >
                <li className="sidebarListItem">
                  <Chat className="sidebarIcon" />
                  <span className="sidebarListItemText">Chats</span>
                </li>
              </Link>
            </ul>
            <hr className="sidebarHr" />
            <ul className="sidebarFriendList">
              {friends.map((u) => (
                <div onClick={() => onClickUser(u)}>
                  <CloseFriend key={u.id} user={u} />
                </div>
              ))}
            </ul>
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              {currentChat ? (
                <>
                  <div>
                    <span>
                      <CloseFriend
                        key={currentFriend.id}
                        user={currentFriend}
                      />
                    </span>
                    <hr className="sidebarHr" />
                  </div>
                  {messages.map((m, index) => (
                    <div ref={scrollRef} key={index}>
                      <Message
                        message={m}
                        own={m.sender === user._id}
                        user={user}
                      />
                    </div>
                  ))}
                  <div className="chatBoxBottom">
                    <textarea
                      className="chatMessageInput"
                      placeholder="write something..."
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    />
                    <button className="chatSubmitButton" onClick={handleSubmit}>
                      Send
                    </button>
                  </div>
                </>
              ) : (
                <span className="noConversationText">
                  Open conversation to start chat.
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={[]}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}
