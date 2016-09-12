import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

import Navbar from './components/display/navbar.jsx';
import SelectorContainer from './components/containers/selectorContainer.jsx';
import SearchContainer from './components/containers/searchContainer.jsx';
import WeatherDisplayContainer from './components/containers/weatherDisplayContainer.jsx';

import weatherApp from './reducers';

let store = createStore(
    weatherApp,
    applyMiddleware(thunkMiddleware)
);

window.onload = function(){
    ReactDOM.render(
        <div>
            <Navbar/>
            <div className="container">
                <SearchContainer store={store}/>
                <SelectorContainer store={store}/>
                <WeatherDisplayContainer store={store}/>
            </div>
        </div>
        , document.getElementById('app'));
}
