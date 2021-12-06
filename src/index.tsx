import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App/components/App';
import './index.css';
import { imageEditors } from './Pictures';
import { solidEditors } from './Solid';
import { addEditorRegistrator } from './Solid/lib/useRegisteredEditors';

addEditorRegistrator(solidEditors);
addEditorRegistrator(imageEditors);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
