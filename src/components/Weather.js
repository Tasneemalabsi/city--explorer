import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';

export class Weather extends Component {

    render() {
        return (
            <div>

         {this.props.myData.map((item, index)=>
         {return(
                    <Card.Body key={index}>
                
            <p>{'date: '+ item.date}</p>
            <p>{'description: '+item.description}</p>
            </Card.Body>)}
)}
               
                
            </div>
        )
    }
}

export default Weather
