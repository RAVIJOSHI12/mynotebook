import AuthContext from "../auth/authContext";
import NoteContext from "./noteContext";
import React,{ useContext, useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  const {token} = useContext(AuthContext);

  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        "auth-token": token // token is not working for localstorage.
      }
    });
    const json = await response.json();
    setNotes(json)
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // API Call 
      const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token    // token is not working for localstorage.

      },
      body: JSON.stringify({title, description, tag})
    });
    
    const note = await response.json();
    setNotes(notes.concat(note));
  }

  // Delete a Note
  const deleteNote = async(id) => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token        // token is not working localstorage.
 
      },
    });
     const json = await response.json();
     console.log(json);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  // Edit a Note
  // eslint-disable-next-line
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token           // token is not working for localstorage.

      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json);

    const newNotes = notes.map((note) =>
      note._id === id ? {...note, title, description, tag }: note
  );
   setNotes(newNotes);
}
  
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
  }
export default NoteState;