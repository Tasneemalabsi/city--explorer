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
      myData : []
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
    let myCityInfo = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/weather?searchquery=${this.state.location}`);
    this.setState({
      myData:myCityInfo.data
    })
    
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
          {this.state.show && this.state.myData.map(item=>
          {return(
            <div>
            <p>{'date: '+ item.date}</p>
            <p>{'description: '+item.desc}</p>
            </div>
          )}
          )}
  
          
          

      </div>
    )
  }
}

export default App
