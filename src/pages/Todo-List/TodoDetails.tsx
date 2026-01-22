import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../api/api"
import Sidebar from "../../components/SideBar"
import toast from "react-hot-toast"
import ApiError from "../../components/ApiError"
import Loading from "../../components/Loading"

interface Todo {
    _id: string
    title: string
    description: string
    price: number
    category: string
    priority: string
    status: string
}

const TodoDetails = () => {
    const [todoDetails, setTodoDetails] = useState<Todo | null>(null)
    const { id } = useParams()
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                setLoader(true)
                const res = await axios.get(`${api}/api/todo/getTaskId/${id}`)
                setTodoDetails(res.data)
            } catch (error) {
                console.log(error)
                toast.error('Something went wrong')
                setError("Api fetching error")

            } finally {
                setLoader(false)
            }
        }
        fetchTodo()
    }, [id])

  

    const priorityColor = (p: string) => {
        if (p === "High") return "#ff4d4d";
        if (p === "Medium") return "#ffb703";
        return "#4ade80";
    };

    if (error) return <ApiError error={error} />
    if (loader) return <Loading />

    return (
        <div className="dashboard_container">
            <Sidebar />

            <main>
                {todoDetails && (
                    <div className="todo-card">

                        <div className="todo-header">
                            <h1>{todoDetails.title}</h1>

                        </div>

                        <div className="todo-info-grid">
                            <div className="info-box">
                                <p>Price</p>
                                <h3>₹ {todoDetails.price}</h3>
                            </div>

                            <div className="info-box">
                                <p>Category</p>
                                <h3 className="category">{todoDetails.category}</h3>
                            </div>

                            <div className="info-box">
                                <p>Priority</p>
                                <h3
                                    style={{
                                        color: priorityColor(todoDetails.priority)

                                    }}
                                    className={` ${todoDetails.priority}`}>
                                    {todoDetails.priority}
                                </h3>
                            </div>

                            <div className="info-box">
                                <p>Status</p>

                                <span
                                    style={{
                                        color: priorityColor(todoDetails.status)

                                    }}
                                    className={`status ${todoDetails.status}`}>
                                    {todoDetails.status}
                                </span>
                           
                            </div>
                        </div>

                        <div className="todo-description">
                            <p>Description</p>
                            <pre>
                                {todoDetails.description}
                            </pre>
                        </div>

                    </div>
                )}
                {/* <Think_Drow /> */}

            </main>
        </div>
    )
}

export default TodoDetails
