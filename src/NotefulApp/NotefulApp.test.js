import React from 'react';
import ReactDOM from 'react-dom';
import NotefulApp from './NotefulApp';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NotefulApp/>, div);
    ReactDOM.unmountComponentAtNode(div);
})