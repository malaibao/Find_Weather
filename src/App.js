import React, { Component } from 'react';
import Weather from './components/Weather/Weather';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ButtonToolbar, Button} from 'react-bootstrap';

class App extends Component{
  state ={
    show: false,
    invalidInput: false,
    city: undefined,
    country: undefined,
    temperature: undefined,
    feel_like_temp: undefined,
    humidity: undefined,
    description: undefined,
  }

  toggleShowHandler = () => {
    this.setState({
      show: !this.state.show,
    })
    console.log(this.state.show + ' in toggleShowHandler');
  }

  getWeaher = async e => {
    e.preventDefault();
    const city = e.target.city.value;
    const country = e.target.country.value;
    console.log(city);
    console.log(country);

    if(city && country){
      let url =`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=6e266bb6cc2e1c51fe1f942432cd3bbf&units=metric`;
      console.log(url);

      await fetch(url)
      .then(res => res.json())
      .then((data)=>{ 

        this.setState({
          city: city,
          country: country,
          temperature: data.main.temp,
          feel_like_temp: data.main.feels_like,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          show: true,
        })
        
      })
      .catch(error => {
        console.log('HAS PROBLEM WITH NAMES');
        this.setState({
          show: false,
          invalidInput: true,
        })
      })
    }else{
      this.setState({
        show:false,
        invalidInput: true,
      })
    }
  }

  render(){
    return (
      <div className="App">
        <div className='wrapper'>
          <div className='container'>
            <div className='main'>
              <div className='form-wrapper'>
                <h1>How's the weather?</h1>
                <form onSubmit={this.getWeaher}>
                  <input className='form-input' name='city' placeholder='City'></input>
                  <input className='form-input' name='country' placeholder='Country'></input>
                  <ButtonToolbar>
                    <Button variant='dark' type='submit'>Submit</Button>
                  </ButtonToolbar>
                  </form>
              </div>
              {this.state.show ? 
                <Weather 
                  city={this.state.city}
                  country={this.state.country}
                  temperature={this.state.temperature}
                  feel_like_temp={this.state.feel_like_temp}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  /> : null}
                  
                  {this.state.invalidInput ? 
                  <div className='invalid-input-msg'>
                    Invalid inputs. Please try again.
                  </div>
                  : null }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
