import Search from '../display/search.jsx';
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => {
    return {};
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onChange: (newCities) => {
            console.log("text changed...");
            dispatch
        }
    }
}


const SearchContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);

export default SearchContainer;
