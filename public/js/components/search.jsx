import React from 'react';

class Search extends React.Component {
    render(){
        return <div className="input-field">
            <input id="search" type="search" required></input>
            <label htmlFor="search"><i className="material-icons">search</i></label>
            <i className="material-icons">close</i>
        </div>;
    }
}

export default Search;
