import React from 'react';
import { render } from '@testing-library/react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className='noteful-header'>
            <h1>
                <Link to="/">
                    Noteful
                </Link>
            </h1>
        </div>
    )
}