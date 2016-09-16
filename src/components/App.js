import React, { Component } from 'react';
import io from 'socket.io-client';
import QualityControl from './QualityControl';
import JobControl from './JobControl';
import './styles/Navbar.css';

const hostname = require('os').hostname().toLowerCase();
const opcEndpoint = `http://37.200.98.133:3700`;

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
           opcData={opcData.filter(e => !this.qcNodes.includes(e.nodeId))}
         />
          <QualityControl 
            opcData={opcData.filter(e => this.qcNodes.includes(e.nodeId))}
          />
        </section>
      );
    } else return null;
  }
}
