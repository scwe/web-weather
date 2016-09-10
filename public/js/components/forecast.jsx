import React from 'react';
import _ from 'underscore';
import utils from '../utils.js';

class Forecast extends React.Component {
    convertDate(date){
        var split = date.split(" ");
        return split[0] + " " + split[1];
    }

    render(){
        var forecast = this.props.forecast.map((forecast) => {
            return <li key={forecast.date}>
                <i className={utils.getImage(forecast.text)}></i>
                <span className="inline-pad">{this.convertDate(forecast.date)}</span>
                <i className="material-icons">arrow_upward</i>
                <span className="inline-pad">{forecast.high}</span>
                <i className="material-icons">arrow_downward</i>
                <span className="inline-pad">{forecast.low}</span>
            </li>;
        });
        return <div className="row">
            <ul>
                {forecast}
            </ul>
        </div>;
    }
}

export default Forecast;
