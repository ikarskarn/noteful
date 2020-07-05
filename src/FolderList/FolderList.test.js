import React from 'react';
import ReactDOM from 'react-dom';
import FolderList from './FolderList';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FolderList/>, div);
    ReactDOM.unmountComponentAtNode(div);
})