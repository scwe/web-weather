import React from 'react';
import _ from 'underscore';
import utils from '../../utils.js';

class Forecast extends React.Component {
    convertDate(date){
        console.log("Splitting: "+date);
        var split = date.split(" ");
        return split[0] + " " + split[1];
    }

    render(){
        var forecast = this.props.forecast.map((forecast) => {
            return <div className="forecast" key={forecast.date}>
                <div className="right-border"></div>
                <h5>
                    {forecast.day}
                </h5>
                <div>
                    {this.convertDate(forecast.date)}
                </div>
                <div className="forecast-info">
                    <div className="forecast-icon">
                        <i className={utils.getImage(forecast.text)}></i>
                    </div>
                    <div className="forecast-temp">
                        <div className="inline-pad">{forecast.high}</div>
                        <div className="inline-pad">{forecast.low}</div>
                    </div>
                    <div className="clear"></div>
                </div>
            </div>;
        });
        return <div>
            {forecast}
            <div className="clear"></div>
        </div>;
    }
}

export default Forecast;
