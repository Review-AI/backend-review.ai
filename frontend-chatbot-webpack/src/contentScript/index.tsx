import React from "react";
import { createRoot } from "react-dom/client";
import ContentScript from './contentScript'
import './index.css';

function init(){
    console.log("creating div element")
    const appContainer = document.createElement('div')
    if(!appContainer){
        throw new Error("Can not find appContainer");
    }
    appContainer.setAttribute('id', 'shopsense-container');
    document.body.style.overflowX = 'hidden';
    document.body.appendChild(appContainer)
    const root = createRoot(appContainer)
    root.render(<ContentScript />);
}

let amazonURL = window.location.href;
let asinID = amazonURL.match('(?:[/dp/]|$)([A-Z0-9]{10})');
if (amazonURL.includes('amazon.com') && asinID){
    init();
}