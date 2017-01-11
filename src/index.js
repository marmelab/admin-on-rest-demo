import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// This one is already present in admin-on-rest Layout, but it seems it does nothing if called after the initial ReactDOM.render()
// @link https://github.com/callemall/material-ui/issues/4670#issuecomment-235031917
import injectTapEventPlugin from 'react-tap-event-plugin';
try {
    injectTapEventPlugin();
} catch (e) {
    // do nothing
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
