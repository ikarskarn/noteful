import React from 'react';
import { Route } from 'react-router-dom';
import './NotefulApp.css';
import '../App.css';
import NotefulContext from '../NotefulContext';
import Main from '../Main/Main';
import Folder from '../Folder/Folder';
import Note from '../Note/Note';
import Header from '../Header.js';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import PropTypes from 'prop-types';
import config from '../config.js';

class NotefulApp extends React.Component {
    state = {
        folder_id: '',
        noteid: '',
        folders: [],
        notes: [],
        renderFolderForm: false,
        renderNoteForm: false,
        updateFolderState: (id) => {
            console.log(parseInt(id))
            this.setState({
                folder_id: parseInt(id),
            });
        },
        updateNoteState: (id) => {
            console.log("update note ID ran: ", id)
            console.log("note content: ", this.state.notes)
            this.setState({
                noteid: id,
            });
        },
        updateNewNoteState: (value) => {
            this.setState({
                renderNoteForm: value,
            })
        },
        updateNewFolderState: (value) => {
            this.setState({
                renderFolderForm: value,
            })
        },
        isSelected: (id) => {
            if(id === parseInt(this.state.folder_id) && this.state.folder_id !== '') {
                return true;
            } else {
                return false;
            }
        },
        deleteNote: noteId => {
            const newNotes = this.state.notes.filter(nn => 
                nn.id !== noteId    
            )
            this.setState({
                notes: newNotes,
            })
        },
        handleRenderForm: () => {
            if(this.state.renderFolderForm) 
                return <AddFolder />
            else if(this.state.renderNoteForm)
                return <AddNote />
        },
        addNote: (note) => {
            this.setState({
                notes: [...this.state.notes, note],
                renderNoteForm: false,
            })
            this.state.handleRenderForm();
        },
        addFolder: (folder) => {
            //console.log("add Folder ID: ", folder.id);
            this.setState({
                folders: [...this.state.folders, folder],
                renderFolderForm: false,
                folder_id: folder.id, //folderId
            })
        },
    };
    
    componentDidMount() {
        fetch(`${config.API_ENDPOINT}/api/folders`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		})
        .then(response => {
            if(!response.ok) {
                return response.json().then(error =>{
                    throw error
                })
            }
            return response.json();
        })
        .then(folders => {
            this.setState({ folders })
        })
        .catch(error => {
            console.error(error);
        });
        
        fetch(`${config.API_ENDPOINT}/api/notes`, {
              method: 'GET',
              headers: {
                  'content-type': 'application/json'
              },
        })
        .then(response => {
            if(!response.ok) {
                return response.json().then(error => {
                    throw error
                })
            }
            return response.json();
        })
        .then(notes => {
            this.setState({ notes })
        })
        .catch(error => {
            console.error('ERROR!!!!', error);
        })
    }
    
    render() {
        return (
            <NotefulContext.Provider value={this.state}>
                <div className="noteful-app">
                    <Header />            
                    <main className='main-app'>
                        <Route exact path='/' component={Main}/>
                        <Route path='/api/folders' component={Folder}/>
                        <Route path='/api/notes' component={Note}/>
                    </main>
                </div>
            </NotefulContext.Provider>
        );
    }
}

NotefulApp.propTypes = {
    state: PropTypes.arrayOf(PropTypes.shape({
        folder_id: PropTypes.number,
        noteid: PropTypes.number,
        folders: PropTypes.arrayOf(PropTypes.object),
        notes: PropTypes.arrayOf(PropTypes.object),
        renderFolderForm: PropTypes.bool,
        renderNoteForm: PropTypes.bool,
    }))
};

export default NotefulApp;