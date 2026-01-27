import Sidebar from "../components/SideBar"
import Profile from "./Profile"

const Dashboard = () => {
  return (
    <div className="dashboard_container">
      <Sidebar/>
      <main>
        <Profile/>
      </main>
    </div>
  )
}

export default Dashboard