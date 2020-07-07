import React from 'react';
import './Main.css';
import FolderList from '../FolderList/FolderList';
import NoteList from '../NoteList/NoteList';
//import STORE from '../STORE';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';

class Main extends React.Component {
    static contextType = NotefulContext;
    render() {
        const folders = this.context.folders.map((folder) => {
            return (
                <Link
                    className='folder' 
                    key={folder.id}
                    id={folder.id}
                    onClick={(e) => this.context.updateFolderState(e.target.id)}
                    to={`/folder`}
                >
                    {folder.name}
                </Link>
            )
        });
        const notes = this.context.notes.map((note) => {
            return(
                <Link
                    key={note.id}
                    className='note'
                    folderid={note.folderId}
                    id={note.id}
                    onClick={(e) => this.context.updateNoteState(e.target.id)}
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
                    <p className="add-folder">Add Folder</p>
                </div>
                <div className="note-list">
                    <NoteList 
                        notes={notes}
                    />
                    <p className="add-note">Add Note</p>
                </div>
            </div>
        );
    }
}

export default Main;