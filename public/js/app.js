import React from 'react';
import ReactDOM from 'react-dom';
import Selector from './components/selector.jsx';
import Search from './components/search.jsx';
import Navbar from './components/navbar.jsx';
import Display from './components/display.jsx';

window.onload = function(){
    ReactDOM.render(
        <div>
            <Navbar/>
            <div className="container">
                <div className="row">
                    <Search/>
                </div>
                <div className="row">
                    <Selector/>
                </div>
                <div className="divider"></div>
                <div className="row">
                    <Display/>
                </div>
            </div>
        </div>
        , document.getElementById('app'));
}
