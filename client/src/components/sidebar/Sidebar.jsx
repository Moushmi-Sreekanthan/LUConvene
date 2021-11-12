// import "./sidebar.css";
// import {
//   RssFeed,
//   Chat,
//   PlayCircleFilledOutlined,
//   Group,
//   Bookmark,
//   HelpOutline,
//   WorkOutline,
//   Event,
//   School,
// } from "@material-ui/icons";
// import { Users } from "../../dummyData";


// export default function Sidebar() {
//   return (
//     <div className="sidebar">
//       <div className="sidebarWrapper">
//         <ul className="sidebarList">
//           <li className="sidebarListItem">
//             <RssFeed className="sidebarIcon" />
//             <span className="sidebarListItemText">Feed</span>
//           </li>
//           <li className="sidebarListItem">
//             <Chat className="sidebarIcon" />
//             <span className="sidebarListItemText">Chats</span>
//           </li>
//           <li className="sidebarListItem">
//             <Event className="sidebarIcon" />
//             <span className="sidebarListItemText">Events</span>
//           </li>
         
//         </ul>
        
//       </div>
//     </div>
//   );
// }


import "./sidebar.css";
import {
  RssFeed,
  Chat,
  Event,
} from "@material-ui/icons";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
         
        
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
        
        </ul>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
