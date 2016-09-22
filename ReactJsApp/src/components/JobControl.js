import React, { Component } from 'react';
import Gauge from './Gauge';
import ReactSwipe from 'react-swipe';
import ChevronLeft from 'react-icons/lib/md/chevron-left';
import ChevronRight from 'react-icons/lib/md/chevron-right';
import './styles/spectre/Table.css';
import './styles/JobControl.css';

export default class JobControl extends Component {

  constructor(props) {
    super(props);
    this.jobAPI = require('../api')['jobControlAPI']; // jobAPI describes the key value binding: {name: , nodeId: }
    this.utils = {
      getPath: (max, value) => { // returns the SVG path
        const dx = 0,
          dy = 0,
          alpha = (max > 0) ? (1 - value / max) * Math.PI : Math.PI,
          Ro = 350 / 2 - 350 / 10,
          Ri = Ro - 350 / 6.666666666666667,
          Cx = 350 / 2 + dx,
          Cy = 200 / 1.25 + dy,
          Xo = 350 / 2 + dx + Ro * Math.cos(alpha),
          Yo = 200 - (200 - Cy) - Ro * Math.sin(alpha),
          Xi = 350 / 2 + dx + Ri * Math.cos(alpha),
          Yi = 200 - (200 - Cy) - Ri * Math.sin(alpha);
        return `M ${Cx - Ri}, ${Cy} L ${Cx - Ro}, ${Cy} A ${Ro}, ${Ro} 0 0 1 ${Xo}, ${Yo} L ${Xi}, ${Yi} A ${Ri}, ${Ri} 0 0 0 ${Cx - Ri}, ${Cy} Z`;
      },
      getOPCValue: (opcData, APINodeId) => { // search the OPCData for nodeIds mentioned in the jobAPI and returns the value of the nodeId
        const r = opcData.find(e => e.nodeId === APINodeId);
        return (r) ? r.value : null;
      },
      findAPINodeId: (API, nodeName) => { // search the jobAPI for a given nodeName String and return the corresponding nodeId
        const r = API.find(e => e.name === nodeName);
        return (r) ? r.nodeId : null;
      },
      numberSlides: []
    }
    this.state = this.getState(this.props);
  }

  componentDidMount() { // lookup after the first rendering occurs, state of the slider
    this.utils.numberSlides = this.refs.swipe.getNumSlides();
    this.setState({ sliderPosition: this.refs.swipe.getPos() });
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getState(nextProps));
  }

  render() {
    const { auftragsstueckzahl, gutteile, schlechtteile, programmname } = this.state;
    const { getPath } = this.utils;
    const time = this.timeToFinish();
    const swipeConfig = {
      continuous: false,
      startSlide: 1,
      stopPropagation: true,
      callback: (i) => this.setState({ sliderPosition: i })
    }

    return (
      <section className="carousel">
      <div className="chevron" onClick={this.prev}><ChevronLeft style={this.toggleVisibility('prev')} /></div>
      <ReactSwipe ref="swipe" swipeOptions={swipeConfig}>

        <div>
          <h5>Auftragsfortschritt</h5>
            <div className="flex_center">
              <Gauge
                gutteile={gutteile}
                pathbg={getPath(auftragsstueckzahl, auftragsstueckzahl)}
                pathval={getPath(auftragsstueckzahl, gutteile)}
              />
            </div>
        </div>

        <div>
          <h5>Produktionsauftrag</h5>
          <table className="table table-striped">
            <tbody> 
              <tr>
                <td>Programm</td>
                <td>{programmname}</td>
              </tr>
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
          <h5>Auftragsende</h5>
          <div className="flex_center">
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
      <div className="chevron" onClick={this.next}><ChevronRight style={this.toggleVisibility('next')} /></div>
    </section>
    );
  }

  getState = (props) => {
    const { opcData } = props;
    const API = this.jobAPI;
    const { getOPCValue, findAPINodeId } = this.utils;
    return {
      auftragsstueckzahl: getOPCValue(opcData, findAPINodeId(API, 'Auftragsstueckzahl')),
      gutteile: getOPCValue(opcData, findAPINodeId(API, 'Gutteile')),
      schlechtteile: getOPCValue(opcData, findAPINodeId(API, 'Schlechtteile')),
      restdauer: JSON.parse(getOPCValue(opcData, findAPINodeId(API, 'Restdauer'))),
      programmname: getOPCValue(opcData, findAPINodeId(API, 'Programmname')),
    }
  }

  prev = () => this.refs.swipe.prev() // Slider movement
  next = () => this.refs.swipe.next()

  toggleVisibility = (pos) => { // chevron visibility
    const { numberSlides } = this.utils;
    const { sliderPosition } = this.state;
    if (pos === 'prev')
      return (sliderPosition === 0) ? { display: 'none' } : {}
    else
      return (sliderPosition + 1 === numberSlides) ? { display: 'none' } : {}
  }

  timeToFinish = () => { // returns a Date object with the time the current job finishes
    const { restdauer } = this.state;
    return new Date(Date.now() + (restdauer.hours * 3600000) + (restdauer.minutes * 60000));
  }
}
