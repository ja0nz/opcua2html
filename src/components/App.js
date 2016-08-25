import './App.css';
import React, { Component } from 'react';
import QualityControl from './QualityControl';
import Auftragsfortschritt from './Auftragsfortschritt';
import io from 'socket.io-client';
//import Navbar from './spectre/Navbar';
//import NavbarSection from './spectre/NavbarSection';

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
        <header classname="navbar bg-grey">
          <section classname="navbar-section">insert connect bar here</section>
        </header>
          <h2>Arburg OPCUA App</h2>
          <Auftragsfortschritt opcData={opcData} />
          <QualityControl opcData={opcData} />
        </section>
      );
    } else return null;  
  }
}
