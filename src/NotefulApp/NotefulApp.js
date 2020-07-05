import React from 'react';
import { Route, Link } from 'react-router-dom';
import './NotefulApp.css';
import Main from '../Main/Main';
import Folder from '../Folder/Folder';
import Note from '../Note/Note';
import Header from '../Header.js';

class NotefulApp extends React.Component {
    state = {
        folderid: '',
        noteid: '',
    };
    updateFolderState = (id) => {
        //console.log(this.state.folderid);
        this.setState({
            folderid: id,
        });
        //console.log(this.state.folderid);
    }
    updateNoteState = (id) => {
        this.setState({
            noteid: id,
        });
    }
    isSelected = (id) => {
        if(id === this.state.folderid && this.state.folderid !== '') {
            return true;
        } else {
            return false;
        }
    }
    render() {
        console.log(this.state.folderid);
        return (
            <div className="noteful-app">
                <header className="noteful-header">
                    <Header />
                    <main>
                        <Route 
                            exact path='/' 
                            render={({history}) =>
                                <Main
                                    onHandleFolderUpdate={id => this.updateFolderState(id)}
                                    onHandleNoteUpdate={id => this.updateNoteState(id)}
                                />                                    
                            } 
                        />
                        <Route 
                            path='/folder' 
                            render={() =>
                                <Folder
                                    onHandleFolderUpdate={id => this.updateFolderState(id)}
                                    onHandleNoteUpdate={id => this.updateNoteState(id)}
                                    isSelected={id => this.isSelected(id)}
                                    folderid={this.state.folderid}
                                />                                    
                            }  
                        />
                        <Route 
                            path='/note' 
                            render={() =>
                                <Note
                                    onHandleFolderUpdate={id => this.updateFolderState(id)}
                                    onHandleNoteUpdate={id => this.updateNoteState(id)}
                                    folderid={this.state.folderid}
                                    noteid={this.state.noteid}
                                />                                    
                            }  
                        />
                    </main>
                </header>
            </div>
        );
    }
}

export default NotefulApp;