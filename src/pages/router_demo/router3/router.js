import React from '../../../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react';
import {HashRouter as Router, Route, Switch} from '../../../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react-router-dom';

import Main from './Main';
import Info from './info';
import About from '../router1/about';
import Topic from '../router1/topic';
import Home from './Home';
import NoMatch from './noMatch';

export default class IRoute extends React.Component {

    render() {
        return (
            <Router>
                <Home>
                    <Switch>
                        <Route path="/main" render={() =>
                            <Main>
                                <Route path="/main/:mainId" component={Info}></Route>
                            </Main>
                        }></Route>
                        <Route path="/about" component={About}></Route>
                        <Route path="/topics" component={Topic}></Route>
                        <Route component={NoMatch}></Route>
                    </Switch>
                </Home>
            </Router>
        );
    }
}