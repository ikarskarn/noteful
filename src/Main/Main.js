import React from 'react';
import './Main.css';
import FolderList from '../FolderList/FolderList';
import NoteList from '../NoteList/NoteList';
import STORE from '../STORE';
import { Link } from 'react-router-dom';
class Main extends React.Component {
    render() {
        const folders = STORE.folders.map((folder) => {
            return (
                <Link
                    className='folder' 
                    key={folder.id}
                    id={folder.id}
                    onClick={(e) => this.props.onHandleFolderUpdate(e.target.id)}
                    to={`/folder`}
                >
                {folder.name}
                </Link>
            )
        });
        const notes = STORE.notes.map((note, idx) => {
            return(
                <Link
                    key={note.id}
                    className='note'
                    folderid={note.folderId}
                    id={note.id}
                    onClick={(e) => this.props.onHandleNoteUpdate(e.target.id)}
                    modified={note.modified}
                    content={note.content}
                    to={'/note'}
                >
                {note.name}
                </Link>
            )
        }) 
        return (
            <div className="main-route">
                <div className="folder-list">
                    <FolderList 
                        folders={folders}
                    />
                    <Link className="add-folder">Add Folder</Link>
                </div>
                <div className="note-list">
                    <NoteList 
                        notes={notes}
                    />
                    <Link className="add-note">Add Note</Link>
                </div>
            </div>
        );
    }
}

export default Main;