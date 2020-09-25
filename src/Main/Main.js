import React from 'react';
import './Main.css';
import FolderList from '../FolderList/FolderList';
import NoteList from '../NoteList/NoteList';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import ListError from '../ListError'; 

class Main extends React.Component {
    static contextType = NotefulContext;
    render() {
        const folders = this.context.folders
        .map((folder) => {
            return (
                <Link
                    className='folder' 
                    key={folder.id}
                    id={folder.id}
                    onClick={(e) => this.context.updateFolderState(e.target.id)}
                    to={`/api/folders/${folder.id}`}
                >
                    {folder.name}
                </Link>
            )
        });
        const notes = this.context.notes
        .map((note) => {
            return(
                <Link
                    key={note.id}
                    className='note'
                    folder_id={note.folder_id}
                    id={note.id}
                    onClick={(e) => {
                        this.context.updateFolderState(note.folder_id);
                        this.context.updateNoteState(e.target.id)
                    }}
                    date_modified={note.date_modified}
                    content={note.content}
                    to={`/api/notes/${note.id}`}
                >
                    {note.note_name}
                </Link>
            )
        }) 
        return (
            <div className="main-route">
                <ListError>
                <div className="folder-list">
                    <FolderList
                        folders={folders}
                    />
                    <button
                        type="button"
                        className="folder__button"
                        onClick={(e) => this.context.updateNewFolderState(true)}
                    >
                        New Folder
                    </button>
                </div>
                <div className="note-list">
                    { this.context.handleRenderForm() || 
                    <>
                        <NoteList notes={notes} />
                        <button
                            type="button"
                            className="note__button"
                            onClick={(e) => this.context.updateNewNoteState(true)}
                        >
                            New Note
                        </button>
                    </> }
                </div>

                </ListError>
            </div>
        );
    }
}

export default Main;