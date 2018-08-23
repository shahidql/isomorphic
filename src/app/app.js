import React, {Component, PropTypes} from 'react';
//import PropTypes from 'prop-types';
//import './app.css';

export default class App extends React.Component {
    constructor(props){
        super(props);
        const componentState = this.props.data.setMissingStates(this,() => {
            return [{
                latestnews: [{
                    headline: 'headline....',
                    dates: 2018
                }]
            }]
        });
        this.state = componentState;
    }
    componentDidMount(){
        this.props.data.onMount();
    }
    getData(){
        return (
            <div className="bar">
                <strong>{this.props.location.pathname}<br /></strong>
                <b>{this.props.data.properties[0].latestnews[0].dates}</b>
                {
                    
                    (this.props.data.properties[0].latestnews[0].headline?<div>{this.props.data.properties[0].latestnews[0].headline}</div>:'')
                }
            </div>
        )
    }

    render(){
        return(
            <div>
                <div>
                    App Component! {this.props.name}
                    {this.getData()}
                </div>
            </div>
        )
    }
}

App.propTypes = {
    data: PropTypes.object.isRequired,
    location: React.PropTypes.object,
    route: React.PropTypes.object
}

// export default class printF extends React.Component {
//     constructor(prop) {
//         super(prop);
//     }
//     getChildContext() { const v=1; }
//     componentDidMount() { let j = 2; }
//     componentWillUnMount() { let k = 100;}
//     render() {
//         <div>
//             <div>
//                 Printing.......
//             </div>
//         </div>
//     }
// }

// printF.propTypes = {
//     dataCall : React.PropTypes.object,
//     forceHide: React.PropTypes.bool
// }

