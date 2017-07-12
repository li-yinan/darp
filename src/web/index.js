import React, {Component} from 'react';
import {render} from 'react-dom';
import thunk from 'redux-thunk';
import {Provider, connect} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers/index';

import './main.less';
import {Coverage} from './components/coverage';
import FloatWindow from './components/floatwindow';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const createStoreWithMiddleware = compose(
    applyMiddleware(
        thunk
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = createStoreWithMiddleware(rootReducer, {});

class App extends Component {
    render() {
        return <div>
            <FloatWindow>
                <Coverage/>
            </FloatWindow>
        </div>;
    }
}

let root = document.createElement('div');
root.className = 'darp';
render(
    <Provider store={store}>
        <MuiThemeProvider>
            <App/>
        </MuiThemeProvider>
    </Provider>,
    root
);
document.body.appendChild(root);

