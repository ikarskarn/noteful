import React from 'react';
import './Note.css';
import FolderList from '../FolderList/FolderList';
import NoteList from '../NoteList/NoteList';
import STORE from '../STORE.js';
import { Link } from 'react-router-dom';

class Note extends React.Component {    
    render() {
        const folders = STORE.folders
        .filter(folder => folder.id === this.props.folderid)
        .map((folder) => {
            return (
                <div className='folder'>
                    <Link
                        className={`go-back`} 
                        key={folder.id}
                        id={folder.id}
                        value={folder.id}
                        onClick={(e) => this.props.onHandleFolderUpdate(e.target.id)}
                        to={`/folder`}
                    >
                    Go Back
                    </Link>
                    <h2>
                        {folder.name}
                    </h2>
                </div>
            )
        });
        const notes = STORE.notes
        .filter(note => note.id === this.props.noteid)
        .map((note) => {
            return (
                <>
                    <div 
                        key={note.id} 
                        className='note'
                        folderid={note.folderId}
                        id={note.id}
                        className='note-title-group'
                    >
                        <h2>{note.name}</h2>
                        <div className='modify-group'>
                            <p>{note.modified}</p>
                            <Link>Delete Note</Link>
                        </div>
                    </div>
                    <p>{note.content}</p>
                </>
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