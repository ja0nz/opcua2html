import React, { Component } from 'react';
import QualityControlNode from './QualityControlNode';
import Select from 'react-select';
import './styles/spectre/Button.css';
import 'react-select/dist/react-select.css';
import './styles/QualityControl.css';

export default class QualityControl extends Component {

  constructor(props) {
    super(props);
    const { opcData } = this.props;
    this.qcAPI = require('../api')['qualityControlAPI'];

    this.utils = {
      noUndef: (r) => (r) ? r.value : null
    }
    this.state = {
      qcobjects: this.qcAPI
        .map(e => ({ name: e.name, isOpen: false })),
      options: this.qcAPI
        .filter(e => opcData.find(f => f.nodeId === e.ist))
        .map(e => ({ label: e.name, value: e.name })),
      value: []
    };
  }

  componentWillReceiveProps(nextProps) {
    const { opcData } = nextProps;
    const { qcobjects } = this.state;
    const { noUndef } = this.utils;
    this.setState({
      qcobjects: this.qcAPI
        .map((e, i) => Object.assign(qcobjects[i], {
          ref: noUndef(opcData.find(f => f.nodeId === e.ref)),
          ist: noUndef(opcData.find(f => f.nodeId === e.ist)),
          tol: noUndef(opcData.find(f => f.nodeId === e.tol))
        }))
    });
  }

  render() {
    const { value, qcobjects } = this.state;

    return (
      <section className="qc">
        <h5 className="qcheading">Qualitätskontrolle</h5>
			  <div className="section">
				  <h3 className="section-heading">{this.props.label}</h3>
				  <Select multi simpleValue 
            clearable={false}
            searchable={false}
            value={this.state.value} 
            placeholder="Istwerte" 
            options={this.state.options} 
            onChange={this.setQualityNodeState}
          />
			  </div>
          <QualityControlNode
              selected={value}
              data={qcobjects}
              onDelete={this.deleteQualityNode}
              onCollapse={this.collapseNode}
          />
      </section>
    );
  }

  collapseNode = (id, e) => {
    e.stopPropagation();
    this.setState({
      qcobjects: this.state.qcobjects
        .map(e => (e.name === id) ? Object.assign(e, { isOpen: !e.isOpen }) : e)
    });
  }

  setQualityNodeState = (value) => {
    this.setState({
      value: (value) ? value.split(',') : []
    });
  }

  deleteQualityNode = (id, e) => {
    e.stopPropagation();
    this.setState({
      value: this.state.value.filter(f => f !== id)
    });
  }
}
