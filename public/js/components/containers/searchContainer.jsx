import Search from '../display/search.jsx';
import { connect } from 'react-redux';
import {fetchCities} from '../../actions';

const mapStateToProps = (state, props) => {
    return {};
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onChange: (input) => {
            console.log(input);
            dispatch(fetchCities(input))
        }
    }
}


const SearchContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);

export default SearchContainer;
