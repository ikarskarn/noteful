import React from 'react';
import './Note.css';
import FolderList from '../FolderList/FolderList';
import NoteList from '../NoteList/NoteList';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import ListError from '../ListError'; 
import config from '../config';

class Note extends React.Component {
    static contextType = NotefulContext;
    deleteNoteRequest(noteId) {
        fetch(`${config.API_ENDPOINT}/api/notes/${noteId}`, {
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
            this.context.deleteNote(noteId)
        })
        .catch(error => {
            console.error(error)
        })
    }
    render() {
        const folders = this.context.folders
        .filter(folder => folder.id === parseInt(this.context.folder_id))
        .map((folder) => {
            return (
                <div className='note-folder' key={folder.id}>
                    <Link
                        className={`go-back`} 
                        id={folder.id}
                        value={folder.id}
                        onClick={(e) => this.context.updateFolderState(e.target.id)}
                        to={'/api/folders'}
                    >
                        Go Back
                    </Link>
                    <h2>
                        Folder: {folder.name}
                    </h2>
                </div>
            )
        });
            
        const notes = this.context.notes
        .filter(note => note.folder_id === parseInt(this.context.folder_id))
        .map((note) => {
            return (
                <div className='note-content' key={note.id}>
                    <div 
                        className='note'
                        folder_id={parseInt(note.folder_id)}
                        id={note.id}
                    >
                        <h2>{note.note_name}</h2>
                        <div className='modify-group'>
                            <p>{note.date_modified}</p>
                            <Link
                                id={note.id}
                                onClick={(e)=>this.deleteNoteRequest(e.target.id, this.context.deleteNote(note.id))} 
                                to={`/api/folders/${note.folder_id}`}
                            >
                                Delete Note
                            </Link>
                        </div>
                    </div>
                    <p>{`Content: ${note.content}`}</p>
                </div>
            )
        }) 
        return (
            <div className="note-route">
                <ListError>
                    <div className="folder-list">
                        <FolderList folders={folders} />
                    </div>
                    <div className="note-list">
                        <NoteList notes={notes} />
                    </div>
                </ListError>
            </div>
        );
    }
}

export default Note;