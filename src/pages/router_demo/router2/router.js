import React from '../../../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react';
import {HashRouter as Router, Route, Link} from '../../../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react-router-dom';

import Main from './Main';
import About from '../router1/about';
import Topic from '../router1/topic';
import Home from './Home';
export default class IRoute extends React.Component {

    render() {
        return (
            <Router>
                <Home>
                    <Route path="/main" render={() =>
                        <Main>
                            <Route path="/main/a" component={About}></Route>
                        </Main>
                    }></Route>
                    <Route path="/about" component={About}></Route>
                    <Route path="/topics" component={Topic}></Route>
                </Home>
            </Router>
        );
    }
}