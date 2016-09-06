import React, { Component } from 'react';
import JobGauge from './JobGauge';
import ReactSwipe from 'react-swipe';

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
      getOPCValue: (data, apiNodeId) => {
        const r = data.find((opc) => opc.nodeId === apiNodeId);
        return (r) ? r.value : null;
      },
      findAPINodeId: (api, stateName) => {
        const r = api.find((entry) => entry.name === stateName);
        return (r) ? r.nodeId : null;
      }
    }

    const { opcData } = this.props;
    const { getOPCValue, findAPINodeId } = this.utils;
    this.state = {
      auftragsstueckzahl: getOPCValue(opcData, findAPINodeId(this.jobAPI, 'Auftragsstueckzahl')),
      gutteile: [],
      schlechtteile: [],
      restdauer: []
    }
  }

  componentWillReceiveProps(nextProps) {
    const { opcData } = nextProps;
    const api = this.jobAPI;
    const { getOPCValue, findAPINodeId } = this.utils;

    this.setState({
      gutteile: getOPCValue(opcData, findAPINodeId(api, 'Gutteile')),
      schlechtteile: getOPCValue(opcData, findAPINodeId(api, 'Schlechtteile')),
      restdauer: JSON.parse(getOPCValue(opcData, findAPINodeId(api, 'Restdauer')))
    });
  }

  render() {
    const { auftragsstueckzahl, gutteile, schlechtteile, restdauer} = this.state;
    const { getPath } = this.utils;
    return (
    <section>
    <h3>Manufacturing Order</h3>
    <ReactSwipe className="carousel" swipeOptions={{continuous: false}}>
      <div>
        <h4>Progress</h4>
          <JobGauge
            gutteile={gutteile}
            pathbg={getPath(auftragsstueckzahl, auftragsstueckzahl)}
            pathval={getPath(auftragsstueckzahl, gutteile)}
          />
      </div>
      <div>
      <h4>Order control</h4>
        <p>Number of pieces: {auftragsstueckzahl}</p>
        <p>Good parts: {gutteile}</p>
        <p>Bad parts: {schlechtteile}</p>
        <p>Remaining time: {`${restdauer.hours}:${restdauer.minutes}`}</p>
      </div>
    </ReactSwipe>
    </section>
    );
  }
}
