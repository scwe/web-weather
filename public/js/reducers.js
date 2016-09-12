import {
    REQUEST_CITIES, RECIEVE_CITIES,
    REQUEST_WEATHER, RECIEVE_WEATHER,
    RESET_CITIES, TOGGLE_SELECTED} from './actions';
import _ from 'underscore';

const initialState = {
    cities:{
        isFetching: false,
        fetchString: "",
        data: [
            {name: "New York", checked: false, displayed: false},
            {name: "Los Angeles", checked: false, displayed: false},
            {name: "Chicago", checked: false, displayed: false},
            {name: "Houston", checked: false, displayed: false},
            {name: "Philadelphia", checked: false, displayed: false},
            {name: "Phoenix", checked: false, displayed: false},
            {name: "San Antonio", checked: false, displayed: false},
            {name: "San Diego", checked: false, displayed: false},
            {name: "Dallas", checked: false, displayed: false},
            {name: "San Jose", checked: false, displayed: false},
            {name: "Austin", checked: false, displayed: false},
            {name: "Jacksonville", checked: false, displayed: false},
            {name: "San Francisco", checked: false, displayed: false},
            {name: "Indianapolis", checked: false, displayed: false},
            {name: "Columbus", checked: false, displayed: false},
            {name: "Fort Worth", checked: false, displayed: false},
            {name: "Charlotte", checked: false, displayed: false},
            {name: "Seattle", checked: false, displayed: false},
            {name: "Denver", checked: false, displayed: false},
            {name: "El Paso", checked: false, displayed: false},
            {name: "Detroit", checked: false, displayed: false},
            {name: "Washington", checked: false, displayed: false},
            {name: "Boston", checked: false, displayed: false},
            {name: "Memphis", checked: false, displayed: false},
            {name: "Nashville", checked: false, displayed: false},
            {name: "Portland", checked: false, displayed: false},
            {name: "Oklahoma City", checked: false, displayed: false},
            {name: "Las Vegas", checked: false, displayed: false},
            {name: "Baltimore", checked: false, displayed: false},
            {name: "Louisville", checked: false, displayed: false}
        ],
    },

    weather: {
        isFetching: false,
        toFetch: [],
        data: []
    }
}

function weatherApp(state = initialState, action){
    switch (action.type) {
        case TOGGLE_SELECTED:
            return Object.assign({}, state, {
                cities: Object.assign({}, state.cities, {
                    data: state.cities.data.map(function(city){
                        if(city.name === action.name){
                            return Object.assign({}, city, {
                                checked: !city.checked
                            });
                        }
                        return city;
                    })
                })
            });
        case REQUEST_CITIES:
            return Object.assign({}, state, {
                cities: Object.assign({}, state.cities, {
                    isFetching: true,
                    fetchString: action.input
                })
            });
        case RECIEVE_CITIES:
            return Object.assign({}, state, {
                cities: Object.assign({}, state.cities, {
                    isFetching: false,
                    data: action.data
                })
            });
        case REQUEST_WEATHER:
            return Object.assign({}, state, {
                weather: Object.assign({}, state.weather, {
                    isFetching: true,
                    toFetch: action.names
                })
            });
        case RECIEVE_WEATHER:
            return Object.assign({}, state, {
                weather: Object.assign({}, state.weather, {
                    isFetching: false,
                    toFetch: [],
                    data: action.data
                })
            });
        case RESET_CITIES:
            return Object.assign({}, state, {
                cities: initialState.cities
            });
        default:
            return state;
    }
}

export default weatherApp;
