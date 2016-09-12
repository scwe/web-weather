import Search from '../display/search.jsx';
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => {
    return {};
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onChange: (text) => {
            console.log("text changed...");
        }
    }
}


const SearchContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);

export default SearchContainer;
