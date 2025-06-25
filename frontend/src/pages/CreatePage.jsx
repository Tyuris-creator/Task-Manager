import axios from "axios"
import axiosInstance from "../lib/axios"
import { ArrowLeftIcon } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router"
function CreatePage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(title, content)
    if (!title || !content) {
      toast.error("ALL FIELDS ARE REQUIRED! IDIOT!😁 мАрСель не ХеЙтИ")
      return
    }
    setLoading(true)
    try {
      await axiosInstance.post("/notes", {
        title,
        content,
      })
      toast.success("Note created successfully!")
      navigate("/")
    } catch (error) {
      if (error.response.status === 429) {
        toast.error("Slow down! you ARE creating notes too fast", {
          duration: 6000,
          icon: "❤️",
        })
      } else {
        toast.error(error)
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create new Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered mb-4"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
