import UserInfo from "./_components/UserInfo";
import Navbar from "../components/Navbar"; 
import getCurrentUser from "../actions/getCurrentUser";
import { getLeaderBoard } from "../actions/getLeaderBoard";

const Dashboard = async () => {
  const currentUser = await getCurrentUser(); 
  const currentLeaderBoard = await getLeaderBoard(); 
  return (
    <div>
        <Navbar/>
        <UserInfo
          currentUser = { JSON.stringify(currentUser) }
          currentLeaderBoard = { JSON.stringify(leaderboard)}  
        /> 
    </div>
  )
}

export default Dashboard