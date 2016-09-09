import React from 'react';

class Selector extends React.Component {
    getItems(){
        return ["New York", "Washington", "Los Angeles", "San Francisco", "Houston"]
    }
    render(){
        var elements = this.getItems().map((e) => {
            return <li className="" key={e}>
                <input type="checkbox" id={e}></input>
                <label htmlFor={e}>{e}</label>
            </li>
        });

        return <form action="#">
            <ul>
                {elements}
            </ul>
            <a className="btn waves-effect teal">submit</a>
        </form>;
    }
}

export default Selector;
