import React from 'react';
import { Route } from 'react-router-dom';
import './NotefulApp.css';
import NotefulContext from '../NotefulContext';
import Main from '../Main/Main';
import Folder from '../Folder/Folder';
import Note from '../Note/Note';
import Header from '../Header.js';

class NotefulApp extends React.Component {
    state = {
        folderid: '',
        noteid: '',
        folders: [],
        notes: [],
        updateFolderState: (id) => {
            this.setState({
                folderid: id,
            });
        },
        updateNoteState: (id) => {
            this.setState({
                noteid: id,
            });
        },
        isSelected: (id) => {
            if(id === this.state.folderid && this.state.folderid !== '') {
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
        }
    };
    componentDidMount() {
        fetch('http://localhost:9090/folders')
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

        fetch('http://localhost:9090/notes')
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
            console.log(notes);
        })
        .catch(error => {
            console.error(error);
        })
    }
    render() {
        return (
            <NotefulContext.Provider value={this.state}>
                <div className="noteful-app">
                    <Header />
                    <main className='main-app'>
                        <Route exact path='/' component={Main}/>
                        <Route path='/folder' component={Folder}/>
                        <Route path='/note' component={Note}/>
                    </main>
                </div>
            </NotefulContext.Provider>
        );
    }
}

export default NotefulApp;