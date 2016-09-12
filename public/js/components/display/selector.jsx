import React from 'react';
import _ from 'underscore';
import WeatherDisplay from './weatherDisplay.jsx';
import LoadingSpinner from './loadingSpinner.jsx';
import {getCheckedCities} from '../../actions';

class Selector extends React.Component {
    generateList(){
        var elements = this.props.cities.map((city) => {
            return <li key={city.name + city.pop}>
                <input type="checkbox" defaultValue={city.checked} id={city.name}></input>
                <label
                    htmlFor={city.name}
                    className="grey-text text-darken-3"
                    onClick={this.props.onCityClicked.bind(this, city.name)}>
                    {city.name}
                </label>
            </li>
        });

        return <div className="columns selector">
            <ul>
                {elements}
            </ul>
        </div>;
    }
    render(){
        var content = "";
        if(this.props.isFetching){
            content = <LoadingSpinner big={true}/>
        }else{
            content = this.generateList();
        }

        return <div>
            {content}
            <a className="btn-large waves-effect teal" id="submit-button" onClick={this.props.onSubmit.bind(this, this.props.cities)}>submit</a>;
            <div className="divider"></div>
        </div>;
    }
}

export default Selector;
