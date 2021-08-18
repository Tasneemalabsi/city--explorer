import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: {},
      location: '',
      cityImg:'',
      show: false,
      myData : [],
      movieInfo:[]
    }
  }

  accessAPI = async (e) => {
    e.preventDefault();

    await this.setState({
      location: e.target.location.value
    })
    let URL = ` https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_MY_KEY}&q=${this.state.location}&format=json`;

    
    let locationData =  await axios.get(URL);
    

    this.setState({
      cityData: locationData.data[0],
     
      show: true
    })

    let imgURL= ` https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_MY_KEY}&center= ${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15&format=png&maptype=roadmap&markers=icon| ${this.state.cityData.lat},${this.state.cityData.lon}`;
    
    this.setState({
      cityImg: imgURL,
     
    })
    let myCityInfo = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/weather?lat=${this.state.cityData.lat}&lon=${this.state.cityData.lon}&key=${process.env.MY_KEY}`);
    this.setState({
      myData:myCityInfo.data
    })
    
    axios.get(`${process.env.REACT_APP_SERVER_LINK}/movies?api_key=${process.env.MOVIES_KEY}&query=${this.state.location}`).then(movieURL=>{
    this.setState({
      movieInfo:movieURL.data
    })})
    // let movieURL= await axios.get(`${process.env.REACT_APP_SERVER_LINK}/movies?api_key=${process.env.MOVIES_KEY}&query=${this.state.location}`);
    // this.setState({
    //   m
    // })
    
  }

  

  

  render() {
    return (
      <div>
        <h1>Enter the city's name</h1>
<form action="" onSubmit={this.accessAPI}>
<input type="text" name='location'  />

<button>Explore!</button>
</form>


{this.state.show && <p>for {this.state.location}, the Latitude is {this.state.cityData.lat} and the Longitude is {this.state.cityData.lon}
 </p> 

          }
          {this.state.show &&  <Card.Img  src={this.state.cityImg} alt='' title='' style={{ width: '18rem', padding:'20px' }}/> }
          {this.state.show && this.state.myData.map((item,index)=>
          {return(
            
            
              <Card.Body key={index}>
                
            <p>{'date: '+ item.date}</p>
            <p>{'description: '+item.description}</p>
            </Card.Body>
            
          )}
          )}
          
          {this.state.show &&  this.state.movieInfo.map((item,index)=>
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

export default App
