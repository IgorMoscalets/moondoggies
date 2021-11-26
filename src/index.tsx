import React from 'react';
import { render } from 'react-dom';
import { App } from './components/App';
import { MoralisProvider } from "react-moralis";
import "style.css"



const APP_ID = "GEopAiMvn4j5xV1HUngZTgUynHjb4c0FPSYD27kJ";
const SERVER_URL = "https://blz71dbm4sc7.usemoralis.com:2053/server";


function index() {
    return (
        <React.StrictMode>
        <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
            <App />
        </MoralisProvider>
        </React.StrictMode>
    )
}

render(index(), document.getElementById('appMainBody'));