import React from 'react';
import './FolderList.css';
import { Link, matchPath } from 'react-router-dom';

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