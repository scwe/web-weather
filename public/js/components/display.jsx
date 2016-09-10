import React from 'react';
import _ from 'underscore';
import utils from '../utils.js';
import Forecast from './forecast.jsx';

class Display extends React.Component {
    getLocation(cityData){
        var l = cityData.location;
        return l.city + ", " + l.region;
    }

    toTemp(v, data){
        return v + data.units.temperature;
    }
    toSpeed(v, data){
        return v + data.units.speed;
    }
    toPressure(v, data){
        return v + data.units.pressure;
    }
    toDist(v, data){
        return v + data.units.distance;
    }

    getRisingIcon(rising){
        switch (rising) {
            case 1:
                return "arrow_upward";
            case 2:
                return "arrow_downward";
            default:
                return "trending_flat"
        }
    }


    render(){
        var cards = _.map(this.props.data, (data) => {
            var windArrowStyle = {
                transform: "rotate("+(data[1].wind.direction)+"deg)"
            }
            //We are using the name of the place as a key... not ideal
            return <div className="col s12 m6 l4" key={data[0]}>
                <div className="card">
                    <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">
                            {this.getLocation(data[1])}
                            <i className="material-icons right">more_vert</i>
                        </span>
                        <div id="current-temp-display">
                            <i className={utils.getImage(data[1].item.condition.text)}></i>
                            <span>{this.toTemp(data[1].item.condition.temp, data[1])}</span>
                            <div className="divider"></div>
                            <span className="flow-text">Wind</span>
                            <span>
                                <i className="material-icons left">blur_on</i>{this.toTemp(data[1].wind.chill, data[1])}
                                {this.toSpeed(data[1].wind.speed, data[1])}
                                <i className="material-icons right" style={windArrowStyle}>navigation</i>
                            </span>
                            <div className="divider"></div>
                            <div className="flow-text">Atmosphere</div>
                            <span>
                                {data[1].atmosphere.humidity +"%"}
                                {this.toPressure(data[1].atmosphere.pressure, data[1])}
                                <i className="material-icons">{this.getRisingIcon(data[1].atmosphere.rising)}</i>
                                {this.toDist((data[1].atmosphere.visibility / 100), data[1])}
                            </span>
                            <div className="divider"></div>
                            <div className="flow-text">Astronomy</div>
                            <div>
                                {utils.formatTime(data[1].astronomy.sunrise)+" "+utils.formatTime(data[1].astronomy.sunset)}
                            </div>
                            <div className="divider"></div>
                            <div className="flow-text">Location</div>
                            <div>
                                {data[1].item.lat+" "+data[1].item.long}
                            </div>
                            <div className="divider"></div>
                            <div className="flow-text">Description</div>
                            <div>
                                {data[1].item.title}
                            </div>
                            <div className="divider"></div>
                            <div className="flow-text">Today you will</div>
                            <div>
                                <i className={utils.getImage(data[1].item.forecast[0].text)}></i>
                                {this.toTemp(data[1].item.forecast[0].high, data[1])}
                                {this.toTemp(data[1].item.forecast[0].low, data[1])}
                            </div>
                        </div>
                    </div>
                    <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">{data.title}<i className="material-icons right">close</i></span>
                        <div className="divider"></div>
                        <Forecast forecast={_.rest(data[1].item.forecast)}/>
                    </div>
                </div>
            </div>;
        });
        var title = this.props.data.length === 0 ? "Select some cities and then click submit to get the weather" : "Your Weather";
        return <div className="row">
            <h4 className="center-align top-buffer">{title}</h4>
            {cards}
        </div>;
    }
}

export default Display;
