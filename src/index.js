import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Router from './router';

//import Life from './pages/demo/Life';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
