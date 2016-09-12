import Selector from '../display/selector.jsx';
import { connect } from 'react-redux';
import {toggleSelected, setWeatherData, getCheckedCities} from '../../actions';


const mapStateToProps = (state, props) => {
    return {
        cities: state.cities
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onCityClicked: (name) => {
            console.log("We changed the state of: "+name);
            dispatch(toggleSelected(name));
        },
        weatherDataSet: (data) => {
            dispatch(setWeatherData(data));
        }
    }
}


const SelectorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Selector);

export default SelectorContainer;
