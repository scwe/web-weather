import Selector from '../display/selector.jsx';
import { connect } from 'react-redux';
import {toggleSelected, fetchWeather, getCheckedCities} from '../../actions';


const mapStateToProps = (state, props) => {
    return {
        cities: state.cities.data,
        isFetching: state.cities.isFetching
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onCityClicked: (name) => {
            dispatch(toggleSelected(name));
        },
        onSubmit: (cities) => {
            dispatch(fetchWeather(getCheckedCities(cities)));
        }
    }
}


const SelectorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Selector);

export default SelectorContainer;
