import React from 'react';

class Search extends React.Component {

    requestData(cityName){
        var url = "/api/cities/"+cityName;
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                console.log("Got the data: "+JSON.stringify(data));
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    }

    render(){
        return <div className="row">
            <div className="input-field col s12">
                <i className="material-icons prefix">textsms</i>
                <input type="text" id="autocomplete-input" className="autocomplete" onChange={this.props.onChange.bind(this)}></input>
                <label htmlFor="autocomplete-input">Search</label>
            </div>
        </div>;
    }
}

export default Search;
