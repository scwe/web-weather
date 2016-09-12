import fetch from 'isomorphic-fetch';

export const TOGGLE_SELECTED = "TOGGLE_SELECTED";
export const REQUEST_CITIES = "REQUEST_CITIES";
export const RECIEVE_CITIES = "RECIEVE_CITIES";
export const REQUEST_WEATHER = "REQUEST_WEATHER";
export const RECIEVE_WEATHER = "RECIEVE_WEATHER"


export function toggleSelected(name){
    return{
        type: TOGGLE_SELECTED,
        name: name
    }
}

export function requestCities(input){
    return {
        type: REQUEST_CITIES,
        input: input
    }
}

export function recieveCities(data){
    return {
        type: RECIEVE_CITIES,
        data: data
    }
}

export function requestWeather(names){
    return{
        type: REQUEST_WEATHER,
        names: names
    }
}

export function recieveWeather(data){
    var parsedData = data.channel;
    if(parsedData.constructor !== Array){
        parsedData = [parsedData];
    }
    return{
        type: RECIEVE_WEATHER,
        data: parsedData
    }
}

export function fetchCities(cityName){
    return function(dispatch){
        dispatch(requestCities(cityName));

        return fetch("/api/cities/"+cityName)
            .then(response => response.json())
            .then(data => {
                dispatch(recieveCities(data));
            });
    };
}

export function fetchWeather(names){
    return function(dispatch){
        dispatch(requestWeather(names));

        return fetch("/api/weather?names="+names.join(","))
            .then(response => response.json())
            .then(data => {
                dispatch(recieveWeather(data));
            })
    }
}

export function getCheckedCities(cities){
    return cities.filter(c => c.checked).map(c => c.name);
}
export function getDisplayedCities(cities){
    return cities.filter(c => c.displayed).map(c => c.name);
}
