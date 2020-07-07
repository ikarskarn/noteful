import React from 'react';
import './NoteList.css';

class NoteList extends React.Component {
    render() {
        return (
            <div className='notes'>
                {this.props.notes}
            </div>
        );
    }
}

export default NoteList;