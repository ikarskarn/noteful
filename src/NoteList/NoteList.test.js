import React from 'react';
import ReactDOM from 'react-dom';
import NoteList from './NoteList';

it('render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NoteList />, div);
    ReactDOM.unmountComponentAtNode(div);
})