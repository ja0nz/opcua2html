import React, { Component } from 'react';
import io from 'socket.io-client';
import QualityControl from './QualityControl';
import JobControl from './JobControl';
import './styles/Navbar.css';

const hostname = require('os').hostname().toLowerCase();
const opcEndpoint = `http://${hostname}:3700`;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { opcData: [] };

    this.qualityControlNodes = ['t4011', 't4012', 't4013', 'V4064', 'V4065', 'V4066', 'p4054', 'p4055', 'p4056', 'p4071', 'p4072', 'p4073'];
  }

  componentDidMount() {
    io(opcEndpoint).on('data', data => this.setState({ opcData: data }));
  }

  render() {
    const { opcData } = this.state;
    if (opcData.length > 0) {
      return (
        <section>
        <header className="navbar bg-grey">
          <section className="navbar-section">insert connect bar here</section>
        </header>
          <h2>Arburg OPCUA App</h2>
          <JobControl 
            opcData={opcData.filter(el => this.qualityControlNodes.indexOf(el.nodeId) === -1)}
          />
          <QualityControl 
            opcData={opcData.filter(el => this.qualityControlNodes.indexOf(el.nodeId) >= 0)}
          />
        </section>
      );
    } else return null;
  }
}
