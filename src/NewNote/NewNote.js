import React from 'react';
import './NewNote.css';
import NotefulContext from '../NotefulContext';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError';

class NewNote extends React.Component {
    static contextType = NotefulContext;
    state={
        id: {
            value: '',
        },
        name: {
            value: '',
            touched: false,
        },
        modified: {
            value: new Date(),
        },
        folderId: {
            value: '',
        },
        content: {
            value: '',
            touched: false,
        },
    }
    generateState() {
        const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.updateIdState(id);
        const modified = new Date();
        this.updateModifiedState(modified);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.generateState();
        const note = {
            id: this.state.id.value,
            name: this.state.name.value,
            modified: this.state.modified.value,
            folderId: this.state.folderId.value,
            content: this.state.content.value,
        };
        const url='http://localhost:9090/notes'
        const options = {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        fetch(url, options)
        .then(response => {
            if(!response.ok) {
                throw new Error('Something went wrong');
            }
            return response.json();
        })
        .then(data=> {
            this.setState({
                id: '',
                name: '',
                modified: '',
                folderId: '',
                content: ''
            });
            this.context.addNote(data);
        })
        .catch(error => {
            console.log(error);
        })
    }
    //#region Update States
    updateIdState(id) {
        this.setState({
            id: {value: id}
        })
    }
    updateNameState(name) {
        this.setState({
            name: { value: name, touched: true },
        })
    }
    updateModifiedState(modified) {
        this.setState({
            modified: { value: modified },
        })
    }
    updateFolderIdState(e) {
        const index = e.target.selectedIndex;
        const optionElement = e.target.childNodes[index];
        const folderid =  optionElement.getAttribute('folderid');
        
        this.setState({
            folderId: { value: folderid },
        })
    }
    updateContentState(content) {
        this.setState({
            content: { value: content, touched: true },            
        })
    }
    //#endregion
    
    handleFormDisplay(value) {
        this.context.updateNewNoteState(value);
        this.context.handleRenderForm();
        this.props.history.push('/');
    }
    validateName() {
        const name = this.state.name.value.trim();
        if(name.length == 0) {
            return 'Name is required';
        } else if (name.length < 3 || name.length > 15) {
            return 'Name should be between 3 and 15 characters';
        }
    }
    validateContent() {
        const content = this.state.content.value.trim();
        if(content.length == 0) {
            return 'Content is required';
        } else if (content.length < 5) {
            return 'Content should be more than 5 characters';
        }
    }
    render() {
        const folderOptions = this.context.folders.map(folder => {
            //console.log('Folder ID: ', folder.id);
            return(
                <option 
                    key={folder.id}
                    folderid={folder.id}
                >
                    {folder.name}
                </option>
            )
        });
                    
        return(
            <form className="new-note" onSubmit={(e)=>this.handleSubmit(e)}>
                <h2>Add New Note</h2>
                <div className="form-group">
                    <label htmlFor="name">Note Name</label>
                    <input 
                        type="text" 
                        className="new-note__control note-name"
                        name="name" 
                        id="name"
                        value={this.state.name.value || ''}
                        onChange={e=>this.updateNameState(e.target.value)}
                    />
                    {this.state.name.touched && (
                        <ValidationError message={this.validateName()}/>
                    )}
                </div>
                <div className="form-group note-content-container">
                    <label htmlFor="content">Note Text</label>
                    <textarea 
                        type="text" 
                        className="new-note__control note-content"
                        name="content" 
                        id="content"
                        value={this.state.content.value || ''}
                        onChange={e=>this.updateContentState(e.target.value)}
                    />
                    {this.state.name.touched && (
                        <ValidationError message={this.validateContent()}/>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="folderId">Folder</label>
                    <select 
                        className="new-note__control note-folder"
                        name="folderId" 
                        id={this.state.folderId.id || ''}
                        value={this.state.folderId.name || ''}
                        onChange={e=>this.updateFolderIdState(e)}
                    >
                        {folderOptions}
                    </select>
                </div>
                <div className="button-group">
                    <button 
                        type="reset" 
                        className="cancel__button"
                        onClick={(e) => this.handleFormDisplay(false)}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit" 
                        className="save__button"
                    >
                        Save Note
                    </button>
                </div>
            </form>
        )
    }
}

NewNote.propTypes = {
    state: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        modified: PropTypes.Date,
        folderId: PropTypes.string,
        content: PropTypes.string,
    }))
};



export default withRouter(NewNote);