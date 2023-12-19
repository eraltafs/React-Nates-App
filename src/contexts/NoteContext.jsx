import React, { createContext, useContext, useEffect, useState } from 'react'
import { AlertContext } from "./AlertContext"

const NoteContext = createContext()

function NoteState(props) {
  const [notes, setNotes] = useState([])
  const [token, setToken] = useState(null)
  const { showAlert } = useContext(AlertContext)

  const host = "https://react-notes-app-backend.onrender.com/api/v1/"

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem("token"))
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  const getNotes = async (token) => {
    const res = await fetch(`${host}/note`, {
      headers: {
        'Content-Type': 'Application/json',
        "authorization": `Bearer ${token}`
      }
    })
    const data = await res.json()
    setNotes(data)
  }
  const addNote = async (title, Description) => {
    const res = await fetch(`${host}/note`, {
      method: "POST",
      body: JSON.stringify({ title, Description }),
      headers: {
        'Content-Type': 'Application/json',
        "authorization": `Bearer ${token}`
      }
    })
    const data = await res.json()
    console.log(data)
    if (data.note) {

      showAlert("success", "Note added successfuly")
      setNotes((prev) => [...prev, data.note])
    } else {
      showAlert("danger", "Note not added")
    }
  }
  const deleteNote = async (_id) => {

    const res = await fetch(`${host}/note/${_id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'Application/json',
        "authorization": `Bearer ${token}`
      }
    })
    const data = await res.json()
    console.log(data)
    if (data.msg === "note deleted") {

      showAlert("success", "Note deleted")
      setNotes((prev) => prev.filter((note) => note._id !== _id))
    } else {
      showAlert("danger", "Note not added")
    }

  }
  const editNote = async (note) => {
    const { _id, title, Description } = note
    console.log(note)
    const res = await fetch(`${host}/note/${_id}`, {
      method: "PUT",
      body: JSON.stringify({ title, Description }),
      headers: {
        'Content-Type': 'Application/json',
        "authorization": `Bearer ${token}`
      }
    })
    const data = await res.json()
    console.log(data)
    if (data.msg === "note updated successfully") {
      showAlert("success", "note updated")
      const updatedNotes = notes.map((note) => {
        if (note._id === _id) {
          return {
            ...note,
            title,
            Description
          }
        }
        return note
      })
      setNotes(updatedNotes)
    } else {
      showAlert("danger", "Note not updated")
    }

  }

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export { NoteState, NoteContext }