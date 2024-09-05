import { useState } from "react"
import { useDispatch } from "react-redux"
import { createBlog as createBlogAction } from "../slices/blogActions"
import { confirmNotification } from "../slices/notificationActions"

const BlogForm = () => {
  const [active, setActive] = useState(false)
  const dispatch = useDispatch()

  const addBlog = async (blogObject) => {
    const newBlog = await dispatch(createBlogAction(blogObject))

    if (newBlog) {
      toggleShow()
    }

    dispatch(
      confirmNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      )
    )
  }

  const createBlog = async (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const formDataObj = Object.fromEntries(formData.entries())

    if (!formDataObj.title || !formDataObj.author || !formDataObj.url) {
      return
    }
    
    try {
      await addBlog(formDataObj)
      toggleShow()
    } catch (exception) {
      console.error("Error calling addBlog:", exception)
    }
  }

  const toggleShow = () => {
    setActive(!active)
  }

  if(!active){
    return (
      <div className="flex justify-center max-w-xl mx-auto m-4" >
        <button
          className="btn btn-primary max-w-xl mx-auto flex-1 text-base-100 rounded-3xl"
          onClick={toggleShow}
        >
          Create new blog
        </button>
      </div>
    )
  }

  return (
    <form
      className="flex flex-col gap-2 justify-center rounded-xl shadow-md p-4 m-4 max-w-xl mx-auto"
      onSubmit={createBlog}
    >
      <Input
        type={"text"}
        label={"Title"}
        name={"title"}
        placeholder={"title"}
      />
      <Input
        type={"text"}
        label={"Author"}
        name={"author"}
        placeholder={"author"}
      />
      <Input type={"url"} label={"Link"} name={"url"} placeholder={"url"} />
      <div className="flex gap-2 m-2">
        <button type="submit" className="btn btn-primary flex-1 rounded-3xl">
          Create
        </button>
        <button type="button" onClick={toggleShow} className="btn btn-error ml-auto flex-3 text-base-100 rounded-3xl">
          Cancel
        </button>
      </div>
    </form>
  )
}

const Input = ({ label, name, type, placeholder }) => {
  return (
    <label className="input input-bordered flex items-center gap-2">
      {label}
      <input type={type} name={name} placeholder={placeholder} />
    </label>
  )
}

export default BlogForm
