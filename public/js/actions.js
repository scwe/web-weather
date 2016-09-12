export const SET_SEARCH = "SET_SEARCH";
export const TOGGLE_SELECTED = "TOGGLE_SELECTED";
export const SET_WEATHER_DATA = "SET_WEATHER_DATA";

export function setSearch(cityName){
    return {
        type: SET_SEARCH,
        name: cityName
    }
}

export function setWeatherData(data){
    return {
        type: SET_WEATHER_DATA,
        data: data
    }
}

export function toggleSelected(name){
    return{
        type: TOGGLE_SELECTED,
        name: name
    }
}

export function getCheckedCities(cities){
    return cities.filter((c) => c.checked);
}

export function getDisplayedCities(cities){
    return cities.filter((c) => c.displayed);
}
