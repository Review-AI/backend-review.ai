import React from 'react';
import ReactDOM from 'react-dom';
import ContentScript from './contentScript/contentScript';

const app = (
    <ContentScript />
);

ReactDOM.render(app, document.getElementById('root'))
