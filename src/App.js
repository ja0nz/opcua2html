import React, { Component } from 'react';
import Nodes from './components/Nodes';
import io from 'socket.io-client';
import './App.css';

const hostname = require('os').hostname().toLowerCase();
const opcEndpoint = `http://${hostname}:3700`;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { opcData: [] };
  }

  componentDidMount() {
    io(opcEndpoint).on('data', data => this.setState({ opcData: data }));
  }

  render() {
    const {opcData} = this.state;
    return (
        <Nodes nodes={opcData} />
    );
  }
}
