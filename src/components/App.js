import React, { Component } from 'react';
import Nodes from './Nodes';
import Gauge from './Gauge';
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
        <div>
        <Nodes nodes={opcData} />
        <Gauge value={opcData[1].value} width={400} height={320} label="This is my Gauge" />
        </div>
      );
    } else return null;  
  }
}
