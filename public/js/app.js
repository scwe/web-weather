import React from 'react';
import ReactDOM from 'react-dom';
import Selector from './components/selector.jsx';
import Search from './components/search.jsx';
import Navbar from './components/navbar.jsx';

window.onload = function(){
    ReactDOM.render(
        <div>
            <Navbar/>
            <div className="container">
                <Selector/>
            </div>
        </div>
        , document.getElementById('app'));
}
