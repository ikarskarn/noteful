import React from 'react';
import './AddNote.css';
import NotefulContext from '../NotefulContext';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError'; 

class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.nameInput = React.createRef();
        this.contentInput = React.createRef();
        this.folderInput = React.createRef();
    }
    static contextType = NotefulContext;
    state={
        id: {
            value: '',
        },
        note_name: {
            value: '',
            touched: false,
        },
        date_modified: {
            value: new Date(),
        },
        folder_id: {
            value: '1',
            touched: false,
        },
        content: {
            value: '',
            touched: false,
        },
        folder_name: {
            value: '',
        },
    }
    
    //#region handlers
    generateState() {
        console.log("Name: ", this.state.note_name.value);
        console.log("Content: ", this.state.content.value);
        console.log("Folder: ", this.state.folder_id.value);
        //const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        //this.updateIdState(id);
        //const modified = new Date();
        //this.updateModifiedState(modified);
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        //this.generateState();
        //const id = this.state.id.value;
        const name = this.nameInput.current.value;
        //const modified = this.state.date_modified.value;
        const folderid = this.state.folder_id.value;
        const content = this.contentInput.current.value;

        const note = { name, folderid, content };
        const url='http://localhost:8000/api/notes'
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
                //id: { value: '' },
                note_name: { value: '', touched: false }, 
                //date_modified: { value: '' },
                folder_id: { value: '', touched: false },
                content: { value: '', touched: false },
            });
            this.context.addNote(data);
            this.props.history.push('/');
        })
        .catch(error => {
            console.error(error);
        })
    }
    handleFormDisplay(value) {
        this.context.updateNewNoteState(value);
        this.context.handleRenderForm();
        //this.props.history.push('/');
    }
    //#endregion
    
    //#region Update States
    updateIdState(id) {
        this.setState({
            id: {value: id}
        })
    }
    updateNameState(name) {
        this.setState({
            note_name: { value: name, touched: true },
        })
    }
    updateModifiedState(modified) {
        this.setState({
            date_modified: { value: modified },
        })
    }
    updateFolderState(e) {
        const index = e.target.selectedIndex;
        const optionElement = e.target.childNodes[index];
        const folder_id =  optionElement.getAttribute('folder_id');
        const folder_name = optionElement.getAttribute('value');
                 
        this.setState({
            folder_id: { value: folder_id, touched: true },
            folder_name: { value: folder_name },
        })
    }
    updateContentState(content) {
        this.setState({
            content: { value: content, touched: true },            
        })
    }
    //#endregion
    
    //#region validators
    validateName() {
        const name = this.state.note_name.value.trim();
        if(name.length === 0) {
            return 'Name is required';
        } else if (name.length < 3 || name.length > 20) {
            return 'Name should be between 3 and 20 characters';
        }
    }
    validateContent() {
        const content = this.state.content.value.trim();
        if(content.length === 0) {
            return 'Content is required';
        } else if (content.length < 5) {
            return 'Content should be more than 5 characters';
        }
    }
    validateFolder() {
        const folderName = this.state.folder_name.value.trim();
        if(folderName.length === 0) {
            return 'Folder is required';
        }
    }
    //#endregion
    
    render() {
        const folderOptions = this.context.folders.map((folder, i) => {
            return(
                <option 
                    key={folder.id}
                    id={folder.id}
                    value={folder.name}
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
                        aria-label="Name of your Note"
                        aria-required="true"
                        aria-describedby="name-constraint"
                        aria-invalid="true"
                        ref={this.nameInput}
                        onChange={e=>this.updateNameState(e.target.value)}
                    />
                    <div id="name-constraint">Enter Name</div>
                    <div className="errorMessage" id="name-error">
                        Name must be between 3 and 20 characters
                    </div>
                    {this.state.note_name.touched && (
                        <ValidationError message={this.validateName()}/>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="content">Note Text</label>
                    <textarea 
                        type="text" 
                        className="new-note__control note-content"
                        name="content" 
                        id="content"
                        aria-label="Content of your Note"
                        aria-required="true"
                        aria-describedby="content-contraint"
                        aria-invalid="true"
                        ref={this.contentInput}
                        onChange={e=>this.updateContentState(e.target.value)}
                    />
                    <div id="content-constraint">Enter Content for Note</div>
                    <div className="errorMessage" id="content-error">
                        Name must be between 3 and 20 characters
                    </div>
                    {this.state.content.touched && (
                        <ValidationError message={this.validateContent()}/>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="folderId">Folder</label>
                    <select 
                        className="new-note__control note-folder"
                        name="folderId" 
                        id="folderId"
                        aria-label="Folder for note"
                        aria-required="true"
                        aria-describedby="folder-constraint"
                        aria-invalid="true"
                        ref={this.folderInput}
                        defaultValue={'default'}
                        onChange={e=>this.updateFolderState(e)}
                    >
                        <option value="default" disabled>Choose a Folder</option>
                        {folderOptions}
                    </select>
                    <div id="folder-constraint">Choose a Folder</div>
                    <div className="errorMessage" id="folder-error">
                        A Folder is Required
                    </div>
                    {this.state.folder_id.touched && (
                        <ValidationError message={this.validateFolder()}/>
                    )}
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
                        disabled={this.validateName() || this.validateContent() || this.validateFolder()}
                        //onClick={(e)=> this.update}
                    >
                        Save Note
                    </button>
                </div>
            </form>
        )
    }
}

AddNote.propTypes = {
    state: PropTypes.arrayOf(PropTypes.shape({
        id: {value: PropTypes.string},
        note_name: {value: PropTypes.string.isRequired},
        date_modified: {value: PropTypes.Date},
        folder_id: {value: PropTypes.string.isRequired},
        content: {value: PropTypes.string.isRequired},
        folder_name: {value: PropTypes.string}
    }))
};

export default withRouter(AddNote);