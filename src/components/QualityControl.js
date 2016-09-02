import React, { Component } from 'react';
import QualityControlNode from './QualityControlNode';
import './styles/Button.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class QualityControl extends Component {

  constructor(props) {
    //props: opcData
    super(props);
    this.qcAPI = require('../api')['qualityControlAPI'];
    this.utils = {
      filterUndefined(props, object, propName) {
        const r = props.find(node => node.nodeId === object[propName]);
        return (r) ? r.value : null;
      }
    }

    this.state = {
      qcobjects: [],
      value: [],
      options: []
    };
  }

  componentWillReceiveProps(nextProps) {
    const { opcData } = nextProps;

    this.setState({
      qcobjects: this.qcAPI
        .map((object) =>
          Object.assign({},
            /* beautify preserve:start */
              { name: object.label },
              { ref: this.utils.filterUndefined(opcData, object, "ref") },
              { ist: this.utils.filterUndefined(opcData, object, "ist") },
              { tol: this.utils.filterUndefined(opcData, object, "tol") }
            /* beautify preserve:end */
          )
        ),
      options: this.qcAPI
        .filter(option => opcData.map(node => node.nodeId).includes(option.ist))
    });
  }

  render() {
    const { value, qcobjects } = this.state;
      return (
        <section>
        <h3>Quality Control Parameters</h3>
			  <div className="section">
				  <h3 className="section-heading">{this.props.label}</h3>
				  <Select multi simpleValue 
            value={this.state.value} 
            placeholder="Select your nodes" 
            options={this.state.options} 
            onChange={this.setQualityNodeState}
          />
			  </div>
          <QualityControlNode
              selected={value}
              data={qcobjects}
              onDelete={this.deleteQualityNode}
          />
      </section>
      );
  }

  setQualityNodeState = (value) => {
    this.setState({
      value: (value) ? value.split(',') : []
    });
  }

  deleteQualityNode = (id, e) => {
    e.stopPropagation();
    this.setState({
      value: this.state.value.filter(val => val !== id)
    });
  }
}
