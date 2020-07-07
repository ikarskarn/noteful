import React from 'react';
import './FolderList.css';

class FolderList extends React.Component {
    render() {
        return (
            <nav className="nav-list">
                {this.props.folders}
            </nav>
        );
    }
} 

export default FolderList; 