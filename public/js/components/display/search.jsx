import React from 'react';

class Search extends React.Component {

    render(){
        return <div className="row">
            <div className="input-field col s12">
                <input id="search" type="text" onChange={this.props.onChange.bind(this)}></input>
                    <label htmlFor="search">Search</label>
                </div>
            </div>;
    }
}

export default Search;
