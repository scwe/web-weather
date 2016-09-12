import React from 'react';
import _ from 'underscore';
import utils from '../../utils.js';
import Forecast from './forecast.jsx';

class WeatherDisplay extends React.Component {
    getLocation(cityData){
        var l = cityData.location;
        return l.city + ", " + l.region;
    }

    toTemp(v, data){
        if(data.units.temperature === "C"){
            return v + "℃";
        }else{
            return v + "℉";
        }
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

    getRisingState(rising){
        switch (rising) {
            case 1:
                return "rising";
            case 2:
                return "falling";
            default:
                return "stable";
        }
    }

    getInfoText(info){
        var loc = info.title.split(" at ")[0];
        var time = info.title.split(" at ")[1];
        return loc + " ("+parseFloat(info.lat).toFixed(2)+", "+parseFloat(info.long).toFixed(2)+") at "+time;
    }


    render(){
        var cards = _.map(this.props.weatherData, (data) => {
            var windArrowStyle = {
                transform: "rotate("+(data.wind.direction)+"deg)"
            }
            //We are using the name of the place as a key... not ideal
            return <div className="col s12 m6 l4" key={this.getLocation(data)}>
                <div className="card">
                    <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4 small-title">
                            {this.getLocation(data)}
                            <i className="material-icons right more-button">more_vert</i>
                        </span>
                        <div className="block-display">
                            <div className="main-icon">
                                <i className={utils.getImage(data.item.condition.text)}></i>
                            </div>
                            <div className="main-info-box">
                                <div className="current-temp">
                                    {this.toTemp(data.item.condition.temp, data)}
                                </div>
                                <div className="current-condition">
                                    {data.item.condition.text}
                                </div>
                            </div>
                            <div className="clear hide-on-large"></div>
                            <div className="info-box aux-temp">
                                <span>
                                    <span className="hide-on-small">
                                        High -
                                    </span>
                                    <span>
                                        {this.toTemp(data.item.forecast[0].high, data)}
                                    </span>
                                </span>
                                <span>
                                    <span className="hide-on-small">
                                        Low -
                                    </span>
                                    <span>
                                        {this.toTemp(data.item.forecast[0].low, data)}
                                    </span>
                                </span>
                            </div>
                            <div className="clear"></div>
                        </div>
                        <div className="block-display">
                            <span className="astronomy block-on-small info-box">
                                <i className="icon-sunrise little-icon"></i>
                                <span className="pad-left-8">
                                    {utils.formatTime(data.astronomy.sunrise)}
                                </span>
                            </span>
                            <span className="astronomy block-on-small info-box">
                                <i className="icon-sunset little-icon"></i>
                                <span className="pad-left-8">
                                    {utils.formatTime(data.astronomy.sunset)}
                                </span>
                            </span>
                            <div className="clear"></div>
                        </div>
                        <div className="divider"></div>
                        <div className="block-display">
                            <div className="subtitle bot-margin-5">
                                Wind
                            </div>
                            <div className="block-display">
                                <span className="block-on-small info-box">
                                    <i className="material-icons" style={windArrowStyle}>navigation</i>
                                    <span className="pad-left-8">
                                        {this.toSpeed(data.wind.speed, data)}
                                    </span>
                                </span>
                                <span className="block-on-small info-box">
                                    <i className="icon-wind little-icon"></i>
                                    <span className="pad-left-8">
                                        {this.toTemp(data.wind.chill, data)}
                                    </span>
                                </span>
                            </div>
                            <div className="clear"></div>
                        </div>
                        <div className="divider"></div>
                        <div className="block-display bottom-block">
                            <div className="block-display">
                                <div className="subtitle">
                                    Atmosphere
                                </div>
                            </div>
                            <div className="block-display">
                                <div className="block-display">
                                    <i className="icon-pressure little-icon"></i>
                                    <span className="pad-left-8">
                                        {this.toPressure(parseInt(data.atmosphere.pressure).toFixed(), data)+",  " +
                                            this.getRisingState(data.atmosphere.rising)}
                                    </span>
                                </div>
                                <div className="clear"></div>
                                <span className="info-box block-on-small">
                                    <i className="icon-humiditidy little-icon"></i>
                                    <span className="pad-left-8">
                                        {data.atmosphere.humidity +"%"}
                                    </span>
                                </span>
                                <span className="info-box block-on-small">
                                    <i className="icon-visibility little-icon"></i>
                                    <span className="pad-left-8">
                                        {this.toDist((data.atmosphere.visibility / 100).toFixed(2), data)}
                                    </span>
                                </span>
                                <div className="clear"></div>
                            </div>
                        </div>
                        <div className="clear"></div>
                        <div className="small-text">
                            {this.getInfoText(data.item)}
                        </div>
                    </div>
                    <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">
                            {data.title}
                            <i className="material-icons more-button">close</i>
                        </span>
                        <Forecast forecast={_.rest(data.item.forecast)} units={data.units}/>
                    </div>
                </div>
            </div>;
            });
        var title = this.props.weatherData.length === 0 ? "Select some cities and then click submit to get the weather" : "Your Weather";
        return <div className="row">
            <h4 className="center-align top-buffer">{title}</h4>
            {cards}
        </div>;
    }
}

export default WeatherDisplay;
