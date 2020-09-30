import React from 'react'; 
import './Folder.css';
import FolderList from '../FolderList/FolderList';
import NoteList from '../NoteList/NoteList';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import ListError from '../ListError';

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
                    className={`folder`} 
                    key={folder.id}
                    id={folder.id}
                    value={folder.id}
                    onClick={(e) => this.context.updateFolderState(e.target.id)}
                    to={`/api/folders/${folder.id}`}
                >
                    {folder.name}
                </Link>
            )
        });
        const notes = this.context.notes
            .filter(note => note.folder_id === parseInt(this.context.folder_id))
            .map((note) => {
            return(
                <Link
                    key={note.id}
                    className='note'
                    folder_id={parseInt(note.folder_id)}
                    id={note.id}
                    onClick={(e) => this.context.updateNoteState(e.target.id)}
                    date_modified={note.date_modified}
                    content={note.content}
                    to={`/api/notes/${note.id}`}
                >
                    {note.note_name}
                </Link>
            )
        })
        return (
            <div className="folder-route">
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
                            <NoteList notes ={notes} />
                            <button
                                type="button"
                                className="note__button"
                                onClick={(e) => this.context.updateNewNoteState(true)}
                            >
                                New Note
                            </button>
                        </>}
                    </div>
                </ListError>
                
            </div>
        );
    }
}

export default Folder;