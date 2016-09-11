import React from 'react';
import _ from 'underscore';
import Display from './display.jsx';

class Selector extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cities: {
                "New York": false,
                "Los Angeles": false,
                "Chicago": false,
                "Houston": false,
                "Philadelphia": false,
                "Phoenix": false,
                "San Antonio": false,
                "San Diego": false,
                "Dallas": false,
                "San Jose": false,
                "Austin": false,
                "Jacksonville": false,
                "San Francisco": false,
                "Indianapolis": false,
                "Columbus": false,
                "Fort Worth": false,
                "Charlotte": false,
                "Seattle": false,
                "Denver": false,
                "El Paso": false,
                "Detroit": false,
                "Washington": false,
                "Boston": false,
                "Memphis": false,
                "Nashville": false,
                "Portland": false,
                "Oklahoma City": false,
                "Las Vegas": false,
                "Baltimore": false,
                "Louisville": false
            },
            weatherData:[]
        };
    }

    updateCity(name){
        var cities = this.state.cities;
        cities[name] = !cities[name];
        return cities;
    }
    checkboxChanged(item){
        this.setState({cities: this.updateCity(item)})
    }
    onSubmit(){
        //Weird version of a filter, but filter only produced a list of booleans...
        var active = _.reduce(this.state.cities, function(memo, state, city){
            if(state){
                memo.push(city);
            }
            return memo;
        }, []);
        this.requestWeatherData(active);
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
                this.setState({weatherData: _.zip(cities, res)});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    }

    render(){
        var elements = _.map(this.state.cities, (state, city) => {
            return <li key={city}>
                <input type="checkbox" defaultValue={state} id={city}></input>
                <label htmlFor={city} className="grey-text text-darken-3" onClick={this.checkboxChanged.bind(this, city)}>{city}</label>
            </li>
        });


        return <div>
            <div className="columns selector">
                <ul>
                    {elements}
                </ul>
            </div>
            <a className="btn-large waves-effect teal" id="submit-button" onClick={this.onSubmit.bind(this)}>submit</a>
            <div className="divider"></div>
            <Display data={this.state.weatherData}/>
        </div>;
    }
}

export default Selector;
