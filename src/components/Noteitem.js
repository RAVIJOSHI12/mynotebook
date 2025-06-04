import React,{ useContext } from 'react';
import noteContext from "../context/notes/noteContext" 

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context; 
    const {note,updateNote} = props;

    const handleDeleted =  () =>{
      deleteNote(note._id);
      props.showAlert("Note was Deteted successfully","success")
    }

    const handleupdated = () =>{
      updateNote(note);
      props.showAlert("Note was updated successfully","success")
    }

  return (
    <div>
      <div className="card text-dark bg-info mb-3 my-3">
        <div className="card-header">Note</div>
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <p className="card-text">{note.tag}</p>
            <i className="fa-solid fa-trash mx-2" role="button" tabIndex={0} aria-hidden="true" onClick={handleDeleted}></i>
            <i className="fa-solid fa-pen-to-square mx-2" role="button" tabIndex={0} aria-hidden="true" onClick={handleupdated}></i>
          </div>
      </div>
    </div>
  )
}

export default Noteitem
