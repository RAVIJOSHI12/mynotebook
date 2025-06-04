// import Notecontext from "./noteContext";
// import React,{ useState } from "react";

// const NoteState = (prop) =>{
//   const host = "http://localhost:5000"
//   const token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgxYTBhOTI2YjQ2OWE3MzU1MzYyZDJlIn0sImlhdCI6MTc0NjU5MjU1OH0.BNemuqGZ7f-SeWDpL1Wv4eHG5xlzGsbu3JL8_u3X9vw

//   const notesInitial = []
//   const [notes, setNotes] = useState(notesInitial)

//   //Get all Notes
//   const getNote = async() =>{
//         // API: TODO CALL
//         try {
//           const response = await fetch(`${host}/api/notes/fetchallnotes`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         "auth-token": `${token}`
//       },
//     });
//     const json = await response.json()
//     console.log(json);
//     setNotes(json)
//         } catch (error) {
//           console.error(error.message);
//         }
//     //     const response = await fetch(`${host}/api/notes/fetchallnotes`, {
//     //   method: 'GET',
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //     "auth-token": `${token}`
//     //   },
//     // });
//     // const json = await response.json()
//     // console.log(json);
//     // setNotes(json)

//       // Add a Note
//       const addNote = async(title, description, tag) =>{
//         // API: TODO CALL
//         try {
//           // const addNote = async(title, description, tag) =>{
//           await fetch(`${host}/api/notes/addnotes`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         "auth-token": `${token}`
//       },
//       body: JSON.stringify({title, description, tag})
//     });

//        const note = {
//             "_id": "681ddb3150beb8db470bd5741",
//             "user": "681a0a926b469a7355362d2e1",
//             "title": title,
//             "description": description,
//             "tag": tag,
//             "date": "2025-05-09T10:38:41.149Z",
//             "__v": 0
//           };
//         setNotes(notes.concat(note))
//       }
//          catch (error) {
//           console.error(error.message);
//         }
//       }
//     //      await fetch(`${host}/api/notes/addnotes`, {
//     //   method: 'POST',
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //     "auth-token": `${token}`
//     //   },
//     //   body: JSON.stringify({title, description, tag})
//     // });

//     //    const note = {
//     //         "_id": "681ddb3150beb8db470bd5741",
//     //         "user": "681a0a926b469a7355362d2e1",
//     //         "title": title,
//     //         "description": description,
//     //         "tag": tag,
//     //         "date": "2025-05-09T10:38:41.149Z",
//     //         "__v": 0
//     //       };
//     //     setNotes(notes.concat(note))
//     //   }

//       // Delete a Note
//       const deleteNote = (id) =>{
//         // API: TODO CALL
//         console.log("delete this note with id" + id);
//         const newNotes = notes.filter((note)=>{return note._id!==id})
//         setNotes(newNotes)
//       }

//       const editNote = async(id,title,description,tag) =>{
//       // Edit a Note
//       try {
//         //API: TODO CALL
//       const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         "auth-token": `${token}`
//       },
//       body: JSON.stringify({title, description, tag})
//     });
//        await response.json();


//     // Logic to client
//         for (let index = 0; index < notes.length; index++) {
//           const element = notes[index];
//           if(element._id === id){
//             element.title = title;
//             element.description = description;
//             element.tag = tag;
//           }
          
//         }
//       }
//        catch (error) {
//         console.error(error.message);
//       }
//     }
//     //   const editNote = async(id,title,description,tag) =>{
//     //     //API: TODO CALL
//     //   const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
//     //   method: 'PUT',
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //     "auth-token": `${token}`
//     //   },
//     //   body: JSON.stringify({title, description, tag})
//     // });
//     //    await response.json();


//     // // Logic to client
//     //     for (let index = 0; index < notes.length; index++) {
//     //       const element = notes[index];
//     //       if(element._id === id){
//     //         element.title = title;
//     //         element.description = description;
//     //         element.tag = tag;
//     //       }
          
//     //     }
//     //   }
    
//       return(
//         <Notecontext.Provider value={{notes, addNote, deleteNote, editNote, getNote}}>
//             {prop.children}
//         </Notecontext.Provider>
//       )
// }
// }
// export default NoteState

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
        "auth-token": token
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
        "auth-token": token

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
        "auth-token": token

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
        "auth-token": token

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
    // Logic to edit in client
    // for (let index = 0; index < notes.length; index++) {
    //   const element = notes[index];
    //   if (element._id === id) {
    //     element.title = title;
    //     element.description = description;
    //     element.tag = tag;
    //   }
    // }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
  }
export default NoteState;