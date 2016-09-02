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
    this.state = { opcData: []};
 //     { nodeId: "t4011", value: "33" },
 //     { nodeId: "t4012", value: "33" },
 //     { nodeId: "t4013", value: "33" },
 //     { nodeId: "V4064", value: "43" },
 //     { nodeId: "V4065", value: "43" },
 //     { nodeId: "V4066", value: "43" },
 //     { nodeId: "p4054", value: "53" },
 //     { nodeId: "p4055", value: "53" },
 //     { nodeId: "p4056", value: "53" }
 //   ] };

    this.qcNodes = require('../api')['qualityControlNodes'];
  }

componentDidMount() {
    io(opcEndpoint).on('data', data => this.setState({ opcData: data }));
  }

  render() {
    const { opcData } = this.state;
      return (
        <section>
          <QualityControl 
            opcData={opcData.filter(el => this.qcNodes.includes(el.nodeId))}
          />
        </section>
      );
  }
}
