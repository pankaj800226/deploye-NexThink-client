import { useEffect, useState } from "react"
import { TaskContext } from "./TaskContext"
import type { ReactNode } from "react"
import axios from "axios"
import { api } from "../../api/api"
import Loading from "../../components/Loading"
import { useDebounce } from "../../hook/useDebounceSearch"

interface TaskProviderProps {
    children: ReactNode
}

export interface TaskProps {
    _id: string
    title: string
    description: string
    price: number
    category: string
    priority: string
    status: string
}

const TaskProvider = ({ children }: TaskProviderProps) => {
    const [allTask, setAllTask] = useState<TaskProps[]>([])
    const [loader, setLoader] = useState(false)
    const [search, setSearch] = useState('')


    const debouncingSearch = useDebounce(search, 500)

    const fetchTask = async () => {
        const token = localStorage.getItem('TOKEN')
        if (!token) return

        try {
            setLoader(true)
            const res = await axios.get(`${api}/api/todo/getTask`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setAllTask(res.data.findTask)

        } catch (error) {
            console.log(error);
        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        fetchTask()
    }, [])


    const searchFilter = allTask.filter((task) =>
        task.title.toLowerCase().includes(debouncingSearch.toLowerCase())
    )



    if (loader) return <Loading />

    return (
        <TaskContext.Provider value={{ allTask, setAllTask, search, setSearch, searchFilter }}>
            {loader ? <Loading /> : children}
        </TaskContext.Provider>
    )
}




export default TaskProvider