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
    this.qcNodes = require('../api')['qualityControlNodes'];
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
            opcData={opcData.filter(el => !this.qcNodes.includes(el.nodeId))}
          />
          <QualityControl 
            opcData={opcData.filter(el => this.qcNodes.includes(el.nodeId))}
          />
        </section>
      );
    } else return null;
  }
}
