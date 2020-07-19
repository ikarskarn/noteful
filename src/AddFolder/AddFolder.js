import React from 'react';
import './AddFolder.css';
import NotefulContext from '../NotefulContext';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError';

class AddFolder extends React.Component {
    constructor(props) {
        super(props);
        this.nameInput = React.createRef();
    }
    static contextType = NotefulContext;
    state = {
        id: {
            value: '',
        },
        name: {
            value: '',
            touched: false,
        }
    }
    
    updateNameState(name) {
        this.setState({
            name: {value: name, touched: true},
        })
    }
    updateIdState(id) {
        this.setState({
            id: {value: id},
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const id = this.state.id.value;
        const name = this.nameInput.current.value;
        const folder = { id, name};
        const url='http://localhost:9090/folders'
        const options = {
            method: 'POST',
            body: JSON.stringify(folder),
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
                name: { value: '', touched: false }
            });
            this.context.addFolder(data);
            this.props.history.push('/');
        })
        .catch(error => {
            console.error(error);
        })
    }
    handleFormDisplay(value) {
        this.context.updateNewFolderState(value);
        this.context.handleRenderForm();
    }
    generateId = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    validateName() {
        const name = this.state.name.value.trim();
        if(name.length === 0) {
            return 'Name is required';
        } else if (name.length < 3 || name.length > 15) {
            return 'Name should be between 3 and 15 characters';
        }
    }
    render() {
        return(
            <form className="new-folder" onSubmit={(e)=>this.handleSubmit(e)}>
                <h2>Add New Folder</h2>
                <div className="form-group">
                    <label htmlFor="name">Folder Name</label>
                    <input 
                        type="text" 
                        className="new-folder__control"
                        name="name" 
                        id="name"
                        ref={this.nameInput}
                        onChange={e=>this.updateNameState(e.target.value)}
                    />
                    {this.state.name.touched && (
                        <ValidationError message={this.validateName()}/>
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
                        disabled={this.validateName()}
                        onClick={(e) => this.updateIdState(this.generateId())}
                    >
                        Save Folder
                    </button>
                </div>
            </form>
        );
    }
}

AddFolder.propTypes = {
    state: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string
    }))
};

export default withRouter(AddFolder);