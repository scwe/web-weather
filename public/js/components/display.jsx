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
        var cards = _.map(this.props.data, (data) => {
            var windArrowStyle = {
                transform: "rotate("+(data[1].wind.direction)+"deg)"
            }
            console.log("Lat: "+data[1].item.lat+" and "+data[1].item.long);
            //We are using the name of the place as a key... not ideal
            return <div className="col s12 m6 l4" key={data[0]}>
                <div className="card">
                    <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4 small-title">
                            {this.getLocation(data[1])}
                            <i className="material-icons right more-button">more_vert</i>
                        </span>
                        <div className="block-display">
                            <div className="main-icon">
                                <i className={utils.getImage(data[1].item.condition.text)}></i>
                            </div>
                            <div className="main-info-box">
                                <div className="current-temp">
                                    {this.toTemp(data[1].item.condition.temp, data[1])}
                                </div>
                                <div className="current-condition">
                                    {data[1].item.condition.text}
                                </div>
                            </div>
                            <div className="clear hide-on-large"></div>
                            <div className="info-box aux-temp">
                                <span>
                                    <span className="hide-on-small">
                                        High -
                                    </span>
                                    <span>
                                        {this.toTemp(data[1].item.forecast[0].high, data[1])}
                                    </span>
                                </span>
                                <span>
                                    <span className="hide-on-small">
                                        Low -
                                    </span>
                                    <span>
                                        {this.toTemp(data[1].item.forecast[0].low, data[1])}
                                    </span>
                                </span>
                            </div>
                            <div className="clear"></div>
                        </div>
                        <div className="block-display">
                            <span className="astronomy block-on-small info-box">
                                <i className="icon-sunrise little-icon"></i>
                                <span className="pad-left-8">
                                    {utils.formatTime(data[1].astronomy.sunrise)}
                                </span>
                            </span>
                            <span className="astronomy block-on-small info-box">
                                <i className="icon-sunset little-icon"></i>
                                <span className="pad-left-8">
                                    {utils.formatTime(data[1].astronomy.sunset)}
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
                                        {this.toSpeed(data[1].wind.speed, data[1])}
                                    </span>
                                </span>
                                <span className="block-on-small info-box">
                                    <i className="icon-wind little-icon"></i>
                                    <span className="pad-left-8">
                                        {this.toTemp(data[1].wind.chill, data[1])}
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
                                        {this.toPressure(parseInt(data[1].atmosphere.pressure).toFixed(), data[1])+",  " +
                                            this.getRisingState(data[1].atmosphere.rising)}
                                    </span>
                                </div>
                                <div className="clear"></div>
                                <span className="info-box block-on-small">
                                    <i className="icon-humiditidy little-icon"></i>
                                    <span className="pad-left-8">
                                        {data[1].atmosphere.humidity +"%"}
                                    </span>
                                </span>
                                <span className="info-box block-on-small">
                                    <i className="icon-visibility little-icon"></i>
                                    <span className="pad-left-8">
                                        {this.toDist((data[1].atmosphere.visibility / 100).toFixed(2), data[1])}
                                    </span>
                                </span>
                                <div className="clear"></div>
                            </div>
                        </div>
                        <div className="clear"></div>
                        <div className="small-text">
                            {this.getInfoText(data[1].item)}
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
