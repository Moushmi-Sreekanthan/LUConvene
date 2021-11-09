import { connect } from "react-redux";
import { searchUser } from "../../actions/searchUser.action";
import Topbar from "./Topbar";

const mapStateToProps =(state)=>({
    searchUserList: state.searchUser
})
const mapDispatchToProps =(dispatch)=>({
    searchCall: (searchQuery)=> dispatch(searchUser(searchQuery))
})

export default connect(mapStateToProps,mapDispatchToProps)(Topbar);