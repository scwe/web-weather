import React from 'react';
import ReactDOM from 'react-dom';
import TestComponent from './components/testComponent.jsx';

window.onload = function(){
    ReactDOM.render(
        <div className="test">
            <TestComponent/>
            Well at least we got this far...
        </div>
        , document.getElementById('app'));
}
