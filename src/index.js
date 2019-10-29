import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import 'bulma'
import './index.css';
import App from './App';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store'
import Video from './components/Video';
import FullWatchHistory from './components/FullWatchHistory';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />

                <Route path="/history" exact component={FullWatchHistory} />
                <Route path="/video" exact component={Video} />
            </Switch>

        </BrowserRouter>
    </Provider>

    , document.getElementById('root'));
