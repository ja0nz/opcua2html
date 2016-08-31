import React, { Component } from 'react';
//import io from 'socket.io-client';
import QualityControl from './QualityControl';
//import JobControl from './JobControl';
//import './styles/Navbar.css';
import States from './Multiselect';

//const hostname = require('os').hostname().toLowerCase();
//const opcEndpoint = `http://${hostname}:3700`;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { opcData: [
      { nodeId: "t4011", value: "33" },
      { nodeId: "t4012", value: "33" },
      { nodeId: "t4013", value: "33" },
      { nodeId: "V4064", value: "43" },
      { nodeId: "V4065", value: "43" },
      { nodeId: "V4066", value: "43" },
      { nodeId: "p4054", value: "53" },
      { nodeId: "p4055", value: "53" },
      { nodeId: "p4056", value: "53" }
    ] };

    this.qualityControlNodes = ['t4011', 't4012', 't4013', 'V4064', 'V4065', 'V4066', 'p4054', 'p4055', 'p4056', 'p4071', 'p4072', 'p4073'];
  }

//componentDidMount() {
//    io(opcEndpoint).on('data', data => this.setState({ opcData: data }));
//  }

  render() {
    const { opcData } = this.state;
      return (
        <section>
          <QualityControl 
            opcData={opcData.filter(el => this.qualityControlNodes.includes(el.nodeId))}
          />
       <States /> 
        </section>
      );
  }
}
