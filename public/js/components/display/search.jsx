import React from 'react';

class Search extends React.Component {

    onChange(event){
        console.log(event.target.value);
        this.props.onChange(event.target.value);
    }

    render(){
        return <div className="row">
            <div className="input-field col s12">
                <input id="search" type="text" onChange={this.onChange.bind(this)}></input>
                    <label htmlFor="search">Search</label>
                </div>
            </div>;
    }
}

export default Search;
