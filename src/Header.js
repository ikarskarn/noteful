import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    render() {
        return (
            <header className='noteful-header'>
                <h1>
                    <Link to="/">
                        Noteful
                    </Link>
                </h1>
            </header>
        )
    
    }
}