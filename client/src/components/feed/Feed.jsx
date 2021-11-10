// import { useContext, useEffect, useState } from "react";
// import Post from "../post/Post";
// import Share from "../share/Share";
// import "./feed.css";
// import axios from "axios";
// import { AuthContext } from "../../context/AuthContext";

// export default function Feed({ getMyPost, searchCall,userList}) {
//   const [posts, setPosts] = useState([]);
//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     getMyPostsCall(user.username)
//   }, [user.username, user._id]);

//   console.log("userList====",userList);
//   console.log('getMyPostsCall',getMyPostsCall)

//   return (
//     <div className="feed">
//       {/* <div className="feedWrapper">
//         {(!username || username === user.username) && <Share />}
//         {posts.map((p) => (
//           <Post key={p._id} post={p} />
//         ))}
//       </div> */}
       
//           {userList && userList.map((item)=>(
//              <li>
//               {item.username}
//             </li>
//           ))} 

//     </div>
//   );
// }



import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username, searchCall }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  console.log("user in feed", user._id,searchCall);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("/posts/timeline/all/"+user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
