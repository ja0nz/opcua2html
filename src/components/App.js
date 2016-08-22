import React, { Component } from 'react';
import QualityControl from './QualityControl';
// import Gauge from './Gauge';
import io from 'socket.io-client';
//import './App.css';

const hostname = require('os').hostname().toLowerCase();
const opcEndpoint = `http://${hostname}:3700`;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { opcData: [] };
  }

  componentDidMount() {
    io(opcEndpoint).on('data', data => this.setState({ opcData: data}));
  }

  render() {
    const {opcData} = this.state;
    if (opcData.length > 0) {
      return (
        <section>
          <p>insert connect bar here</p>
          <h1>Arburg OPCUA App</h1>
          <p>insert gauge here</p>
          <QualityControl opcData={opcData} />
        </section>
      );
    } else return null;  
  }
}
