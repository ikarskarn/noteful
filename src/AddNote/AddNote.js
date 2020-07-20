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
        name: {
            value: '',
            touched: false,
        },
        modified: {
            value: new Date(),
        },
        folderId: {
            value: '',
            touched: false,
        },
        content: {
            value: '',
            touched: false,
        },
        folderName: {
            value: '',
        },
    }
    
    //#region handlers
    generateState() {
        console.log("Name: ", this.state.name.value);
        console.log("Content: ", this.state.content.value);
        console.log("Folder: ", this.state.folderId.value);
        const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.updateIdState(id);
        const modified = new Date();
        this.updateModifiedState(modified);
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.generateState();
        const id = this.state.id.value;
        const name = this.nameInput.current.value;
        const modified = this.state.modified.value;
        const folderId = this.state.folderId.value;
        const content = this.contentInput.current.value;

        const note = { id, name, modified, folderId, content };
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
                id: { value: '' },
                name: { value: '', touched: false }, 
                modified: { value: '' },
                folderId: { value: '', touched: false },
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
            name: { value: name, touched: true },
        })
    }
    updateModifiedState(modified) {
        this.setState({
            modified: { value: modified },
        })
    }
    updateFolderState(e) {
        const index = e.target.selectedIndex;
        const optionElement = e.target.childNodes[index];
        const folderid =  optionElement.getAttribute('folderid');
        const folderName = optionElement.getAttribute('value');
                 
        this.setState({
            folderId: { value: folderid, touched: true },
            folderName: { value: folderName },
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
        const name = this.state.name.value.trim();
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
        const folderName = this.state.folderName.value.trim();
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
                    folderid={folder.id}
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
                    {this.state.name.touched && (
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
                    {this.state.name.touched && (
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
                    {this.state.folderId.touched && (
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
        name: {value: PropTypes.string.isRequired},
        modified: {value: PropTypes.Date},
        folderId: {value: PropTypes.string.isRequired},
        content: {value: PropTypes.string.isRequired},
        folderName: {value: PropTypes.string}
    }))
};

export default withRouter(AddNote);

