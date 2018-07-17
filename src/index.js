import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Admin from './admin';

import Router from './pages/router_demo/router2/router';

//import Life from './pages/demo/Life';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
