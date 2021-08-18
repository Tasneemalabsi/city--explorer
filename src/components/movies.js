import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';

export class Movies extends Component {
    render() {
        return (
            <div>
                {this.props.movieInfo.map((item,index)=>
          {return(
            
            
              <Card.Body key={index}>
                
                {console.log(item)}
            <p>{'title: '+ item.title}</p>
            <p>{'overview: '+item.overview}</p>
            <p>{'average_votes: '+item.average_votes}</p>
            <p>{'total_votes: '+ item.total_votes}</p>
            <img src={item.image_url} alt="" title='' />
            <p>{'popularity: '+item.popularity}</p>
            <p>{'released on : '+ item.released_on}</p>
            </Card.Body>
            
          )}
          )}
            </div>
        )
    }
}

export default Movies
