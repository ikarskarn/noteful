import React from 'react';
import './Note.css';
import FolderList from '../FolderList/FolderList';
import NoteList from '../NoteList/NoteList';
//import STORE from '../STORE.js';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';

class Note extends React.Component {
    static contextType = NotefulContext;
    deleteNoteRequest(noteId, callback) {
        fetch(`http://localhost:9090/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw error
                })
            }
            return response.json()
        })
        .then(data => {
            callback(noteId)
        })
        .catch(error => {
            console.error(error)
        })
    }
    render() {
        const folders = this.context.folders
        .filter(folder => folder.id === this.context.folderid)
        .map((folder) => {
            return (
                <div className='folder'>
                    <Link
                        className={`go-back`} 
                        key={folder.id}
                        id={folder.id}
                        value={folder.id}
                        onClick={(e) => this.context.updateFolderState(e.target.id)}
                        to={'/folder'}
                    >
                        Go Back
                    </Link>
                    <h2>
                        {folder.name}
                    </h2>
                </div>
            )
        });
        const notes = this.context.notes
        .filter(note => note.id === this.context.noteid)
        .map((note) => {
            return (
                <div className='note-content' key={note.id}>
                    <div 
                        className='note'
                        folderid={note.folderId}
                        id={note.id}
                        className='note-title-group'
                    >
                        <h2>{note.name}</h2>
                        <div className='modify-group'>
                            <p>{note.modified}</p>
                            <Link
                                id={note.id}
                                onClick={(e)=>this.deleteNoteRequest(e.target.id, this.context.deleteNote(note.id))} 
                                to='/'
                            >
                                Delete Note
                            </Link>
                        </div>
                    </div>
                    <p>{note.content}</p>
                </div>
            )
        }) 
        return (
            <div className="note-route">
                <div className="folder-list">
                    <FolderList 
                        folders={folders}
                    />
                </div>
                <div className="note-list">
                    <NoteList 
                        notes={notes}
                    />
                </div>
            </div>
        );
    }
}

export default Note;