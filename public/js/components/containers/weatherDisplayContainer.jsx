import WeatherDisplay from '../display/weatherDisplay.jsx';
import { connect } from 'react-redux';


const mapStateToProps = (state, props) => {
    return {
        weatherData: state.weather
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {}
}


const WeatherDisplayContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(WeatherDisplay);

export default WeatherDisplayContainer;
