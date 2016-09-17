import React, { Component } from 'react';
import JobGauge from './JobGauge';
import ReactSwipe from 'react-swipe';
import './styles/Table.css';
import './styles/Time.css';
import './styles/Carousel.css';

export default class JobControl extends Component {

  constructor(props) {
    super(props);
    this.jobAPI = require('../api')['jobControlAPI'];

    this.utils = {
      getPath: (max, value) => {
        //  width: 350,
        //  height: 200,
        const dx = 0;
        const dy = 0;

        const alpha = (1 - value / max) * Math.PI;
        const Ro = 350 / 2 - 350 / 10;
        const Ri = Ro - 350 / 6.666666666666667;

        const Cx = 350 / 2 + dx;
        const Cy = 200 / 1.25 + dy;

        const Xo = 350 / 2 + dx + Ro * Math.cos(alpha);
        const Yo = 200 - (200 - Cy) - Ro * Math.sin(alpha);
        const Xi = 350 / 2 + dx + Ri * Math.cos(alpha);
        const Yi = 200 - (200 - Cy) - Ri * Math.sin(alpha);

        return `M ${Cx - Ri}, ${Cy} L ${Cx - Ro}, ${Cy} A ${Ro}, ${Ro} 0 0 1 ${Xo}, ${Yo} L ${Xi}, ${Yi} A ${Ri}, ${Ri} 0 0 0 ${Cx - Ri}, ${Cy} Z`;
      },
      getOPCValue: (opcData, APINodeId) => {
        const r = opcData.find(e => e.nodeId === APINodeId);
        return (r) ? r.value : null;
      },
      findAPINodeId: (API, nodeName) => {
        const r = API.find(e => e.name === nodeName);
        return (r) ? r.nodeId : null;
      },
      numberSlides: []
    }

    const { opcData } = this.props;
    const API = this.jobAPI;
    const { getOPCValue, findAPINodeId } = this.utils;
    this.state = {
      auftragsstueckzahl: getOPCValue(opcData, findAPINodeId(API, 'Auftragsstueckzahl')),
      gutteile: [],
      schlechtteile: [],
      restdauer: [],
      programmname: [],
      sliderPosition: []
    }
  }

  componentDidMount() {
    this.utils.numberSlides = this.refs.swipe.getNumSlides();
    this.setState({ sliderPosition: this.refs.swipe.getPos() });
  }

  componentWillReceiveProps(nextProps) {
    const { opcData } = nextProps;
    const API = this.jobAPI;
    const { getOPCValue, findAPINodeId } = this.utils;

    this.setState({
      gutteile: getOPCValue(opcData, findAPINodeId(API, 'Gutteile')),
      schlechtteile: getOPCValue(opcData, findAPINodeId(API, 'Schlechtteile')),
      restdauer: JSON.parse(getOPCValue(opcData, findAPINodeId(API, 'Restdauer'))),
      programmname: getOPCValue(opcData, findAPINodeId(API, 'Programmname')),
    });
  }

  render() {
    const { auftragsstueckzahl, gutteile, schlechtteile, programmname } = this.state;
    const { getPath } = this.utils;
    const time = this.timeToFinish();
    return (
      <section className="carousel">
    <button style={this.arrowVisibility('prev')} className="chevronLeft" onClick={this.prev}></button>
    <ReactSwipe ref="swipe" swipeOptions={{continuous: false, startSlide: 1, callback: (i) => this.setState({ sliderPosition: i }) }}>

      <div>
        <h5>Fortschritt</h5>
          <JobGauge
            gutteile={gutteile}
            pathbg={getPath(auftragsstueckzahl, auftragsstueckzahl)}
            pathval={getPath(auftragsstueckzahl, gutteile)}
          />
      </div>

      <div>
        <h5>Produktionsauftrag</h5>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Programm</th>
              <th>{programmname}</th>
            </tr>
          </thead>
          <tbody> 
            <tr>
              <td>Anzahl</td>
              <td>{auftragsstueckzahl}</td>
            </tr>
            <tr>
              <td>Gutteile</td>
              <td>{gutteile}</td>
            </tr>
            <tr>
              <td>Schlechtteile</td>
              <td>{schlechtteile}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h5>Uhrzeit Auftragsende</h5>
        <div className="flex">
          <time dateTime={time}>
            {time.toLocaleTimeString('de-DE', {
                hour12: false,
                hour: 'numeric',
                minute: 'numeric'
            })}
          </time>
        </div>
      </div>

    </ReactSwipe>
    <button style={this.arrowVisibility('next')} className="chevronRight" onClick={this.next}></button>
    </section>
    );
  }

  prev = () => this.refs.swipe.prev()
  next = () => this.refs.swipe.next()

  arrowVisibility = (pos) => {
    const { numberSlides } = this.utils;
    const { sliderPosition } = this.state;
    if (pos === 'prev')
      return (sliderPosition === 0) ? { background: 'none' } : {}
    else
      return (sliderPosition+1 === numberSlides) ? { background: 'none' } : {}
  }

  timeToFinish = () => {
    const { restdauer } = this.state;
    return new Date(Date.now() + (restdauer.hours * 3600000) + (restdauer.minutes * 60000));
  }
}
