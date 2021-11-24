import React from 'react';
import { render } from 'react-dom';
import { App } from './components/App';
import "style.css"

function index() {
    return (
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )
}

render(index(), document.getElementById('appMainBody'));