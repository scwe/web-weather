import React from 'react';
import _ from 'underscore';

class Display extends React.Component {
    getWeatherRes(){
        return
    }
    render(){
        console.log("Updating with new weatherData: "+this.props.data);
        var cards = _.map(this.props.data, (data) => {
            //We are using the name of the place as a key... not ideal
            console.log(data);
            return <div className="col s12 m6 l4" key={data[0]}>
                <div className="card">
                    <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" src="images/office.jpg"></img>
                    </div>
                    <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">{data[0] + " - Weather"}<i className="material-icons right">more_vert</i></span>
                        <p><a href="#">This is a link</a></p>
                    </div>
                    <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">{data.title}e<i className="material-icons right">close</i></span>
                        <p>{JSON.stringify(data)}</p>
                    </div>
                </div>
            </div>;
        });
        var title = this.props.data.length === 0 ? "There Doesn't seem to be anything here" : "Results";
        return <div className="row">
            <h4 className="center-align top-buffer">{title}</h4>
            {cards}
        </div>;
    }
}

export default Display;
