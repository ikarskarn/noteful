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
                        </>}
                    </div>
                </ListError>
                
            </div>
        );
    }
}

export default Folder;