import React from 'react';
import _ from 'underscore';
import WeatherDisplay from './weatherDisplay.jsx';
import {getCheckedCities} from '../../actions';

class Selector extends React.Component {

    onSubmit(){
        var checked = getCheckedCities(this.props.cities);

        this.requestWeatherData(checked.map(c => {
            return c.name;
        }));
    }

    requestWeatherData(cities){
        var url = "/api/weather?names="+cities.join(",");
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                var res = data.channel;
                if(cities.length === 1){
                    res = [res];
                }
                this.props.weatherDataSet(_.zip(cities, res));
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    }

    render(){
        var elements = this.props.cities.map((city) => {
            return <li key={city.name}>
                <input type="checkbox" defaultValue={city.checked} id={city.name}></input>
                <label
                    htmlFor={city.name}
                    className="grey-text text-darken-3"
                    onClick={this.props.onCityClicked.bind(this, city.name)}>
                    {city.name}
                </label>
            </li>
        });


        return <div>
            <div className="columns selector">
                <ul>
                    {elements}
                </ul>
            </div>
            <a className="btn-large waves-effect teal" id="submit-button" onClick={this.onSubmit.bind(this)}>submit</a>;
            <div className="divider"></div>
        </div>;
    }
}

export default Selector;
