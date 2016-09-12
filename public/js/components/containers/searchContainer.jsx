import Search from '../display/search.jsx';
import { connect } from 'react-redux';
import {fetchCities} from '../../actions';

const mapStateToProps = (state, props) => {
    return {};
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onChange: (input) => {
            dispatch(fetchCities(input.target.value))
        }
    }
}


const SearchContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);

export default SearchContainer;
