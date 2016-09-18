import React, { Component } from 'react';
import io from 'socket.io-client';
import QualityControl from './QualityControl';
import JobControl from './JobControl';
import './styles/App.css';

//const opcEndpoint = `http://${require('os').hostname().toLowerCase()}:3700`;
const opcEndpoint = `http://opc.bamoo.de:3700`;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.socket = io.connect(opcEndpoint);
    this.state = { opcData: [], connected: false };
  }

  componentDidMount() {
    this.socket.on('data', data => this.setState({ opcData: data }));
    this.socket.on('connect', () => this.setState({ connected: true}));
    this.socket.on('disconnect', () => this.setState({ connected: false }));
  }

  render() {
    const { opcData, connected } = this.state;
    if (opcData.length > 0) {
      return (
        <section>
          <header className="navbar bg-grey">
            <h4>Virtual Arburg 270S</h4>
            <div className={((connected) ? "in green" : "in red")}></div>
          </header>
          <JobControl opcData={opcData} />
          <QualityControl opcData={opcData} />
          <footer>
            <div></div>
          </footer>
        </section>
      );
    } else return null;
  }
}
