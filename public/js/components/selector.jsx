import React from 'react';
import _ from 'underscore';
import Display from './display.jsx';

class Selector extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cities: {
                "New York": false,
                "Washington": false,
                "Los Angeles": false,
                "San Francisco": false,
                "Houston": false,
                "Some more": false,
                "Some more1": false,
                "Some more2": false,
                "Some more3": false,
                "Some more4": false,
                "Some more5": false,
                "Some more6": false,
                "Some more8": false,
                "Some more7": false,
                "Some more9": false,
                "Some morea": false,
                "Some moreb": false,
                "Some morec": false,
                "Some mored": false,
                "Some moree": false,
                "Some moref": false,
                "Some moreg": false,
                "Some moreh": false,
                "Some mori": false,
                "Some morej": false,
                "Some morek": false,
                "Some morel": false,
                "Some morem": false
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
