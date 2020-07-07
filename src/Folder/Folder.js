import React from 'react';
import './Folder.css';
import FolderList from '../FolderList/FolderList';
import NoteList from '../NoteList/NoteList';
//import STORE from '../STORE';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';

class Folder extends React.Component {
    static contextType = NotefulContext;
    isSelected = (selected) => {
        let str = '';
        if(selected) {
            str = 'highlight';
        }
        return str;
    }
    render() {
        const folders = this.context.folders
        .map((folder) => {
            return (
                <Link
                    className={`folder ${this.isSelected(this.context.isSelected(folder.id))}`} 
                    key={folder.id}
                    id={folder.id}
                    value={folder.id}
                    onClick={(e) => this.context.updateFolderState(e.target.id)}
                    to={`/folder`}
                >
                    {folder.name}
                </Link>
            )
        });
        const notes = this.context.notes
            .filter(note => {
                return(
                    note.folderId === this.context.folderid
                );
            })
            .map((note) => {
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
            <div className="folder-route">
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

export default Folder;