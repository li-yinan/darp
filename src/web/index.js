import React from 'react';
import ReactDom from 'react-dom';

import './main.less';

class App extends React.Component {
    render() {
        return <div>hello</div>;
    }
}

let root = document.createElement('div');
root.className = 'darp';
ReactDom.render(<App/>, root);
document.body.appendChild(root);
