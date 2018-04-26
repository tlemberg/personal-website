import React, { Component } from 'react';
import { Engine, Render, World, Bodies } from 'matter-js';
import logo from './logo.svg';
import './App.css';
import IntroText from './IntroText';
import CityScape from './CityScape';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeOfDay: 'night',
      width: 1,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    return (
      <div className="App" style={{
        height: this.state.width > 600 ? '100vh' : undefined,
        backgroundColor: this.state.timeOfDay === 'night' ? '#3b1d8f' : '#a8c6fa',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
          paddingTop: this.state.width > 600 ? 100 : 40,
        }}>
          <div style={{
            flex: 1,
            marginLeft: 40,
            marginRight: 40,
            marginBottom: 40,
          }}>
            <IntroText daytime={this.state.timeOfDay === 'night' ? false : true}/>
          </div>
          {this.state.width > 600 && (
            <div style={{
              marginRight: 140,
            }}>
              <img
                src={require('./assets/images/moon.svg')}
                width={100}
                height={100}
              />
            </div>
          )}
        </div>
        <CityScape />
      </div>
    );
  }
}

export default App;
