import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { opcData: [] };
  }

  componentDidMount() {
    io().on('data', data => this.setState({ opcData: data }));
  }


  render() {
    const {opcData} = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
      </div>
    );
  }
}
