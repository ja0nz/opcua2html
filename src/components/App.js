import React, { Component } from 'react';
import QualityControl from './QualityControl';
import Auftragsfortschritt from './Auftragsfortschritt';
import io from 'socket.io-client';
//import Loading from './spectre/Loading';

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
          <Auftragsfortschritt opcData={opcData} />
          <QualityControl opcData={opcData} />
        </section>
      );
    } else return null;  
  }
}
