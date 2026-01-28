import axios from "axios"
import React, { useEffect, useState } from "react"
import { api } from "../../../api/api"
import ApiError from "../../../components/ApiError"
import Loading from "../../../components/Loading"
import { Button } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material"
import Sidebar from "../../../components/SideBar"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"

interface Feature {
  _id: string
  title: string
  status: string
}
interface ids {
  id: string
}

const ProjectFeature: React.FC<ids> = ({ id }) => {
  const [allFeature, setAllFeature] = useState<Feature[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const fetchFeature = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${api}/api/feature/get/feature/${id}`)
        setAllFeature(res.data.findFeature)
      } catch (error) {
        console.log(error);
        setError("api fetching error")
      } finally {
        setLoading(false)
      }
    }

    fetchFeature()
  }, [])


  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${api}/api/feature/delete/feature/${id}`)

      setAllFeature((prev) => prev.filter((f) => f._id !== id))

      toast.success("feature delete done")
    } catch (error) {
      console.log(error);
      toast.error('error')

    }
  }

  if (error) return <ApiError error={error} />
  if (loading) return <Loading />

  return (
    <div className="dashboard_container">
      <Sidebar />

      <main>
        <div className="todo-wrapper">
          <h2 className="todo-title">All Feature</h2>

          {allFeature.length === 0 ? (
            <div className="todo-empty">No todos yet 🚀</div>
          ) : (
            <ul className="todo-list">
              {allFeature.map((feature, index) => (
                <li
                  key={index}
                  className={`todo-item ${feature.status}`}
                >
                  <div className="todo-left">
                    <span className="todo-dot" />
                    <div>
                      <h4>{feature.title}</h4>
                      <small>{feature.status}</small>
                    </div>
                  </div>


                  <div className="todo-actions">
                    <Link to={`/editfeature/${feature._id}`}>
                      <Button size="small">
                        <Edit />
                      </Button>
                    </Link>

                    <Button
                      onClick={() => handleDelete(feature._id)}
                      size="small" color="error">
                      <Delete />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

    </div>
  )
}

export default ProjectFeature