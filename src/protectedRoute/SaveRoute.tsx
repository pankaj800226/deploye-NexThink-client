import { Navigate, Outlet } from "react-router-dom"

const SaveRoute = () => {
    const token = localStorage.getItem('TOKEN')
    return token ? <Outlet /> : <Navigate to={'/login'} />
}

export default SaveRoute