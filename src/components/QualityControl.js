import React, { Component } from 'react';
import QualityControlNode from './QualityControlNode';
import './styles/Button.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class QualityControl extends Component {


  constructor(props) {
    //props: opcData
    super(props);
    const { opcData } = this.props;
    this.qcCombined = require('../api')['qualityControlCombined'];
    this.qcSelectables = require('../api')['qualityControlSelectables'];

    this.utils = {
      mapData(value) {
        return opcData.map(node => node[value]);
      },
      cleanValue(object) {
        if (object !== undefined)
          return object.value;
      },
    }

    this.state = {
      /* beautify preserve:start */
      qcobjects: this.qcCombined
        .map(object => Object.assign({},
              { name: object.name },
              { ref: this.utils.cleanValue(opcData.find(node => node.nodeId === object.ref)) },
              { ist: this.utils.cleanValue(opcData.find(node => node.nodeId === object.ist)) },
              { tol: this.utils.cleanValue(opcData.find(node => node.nodeId === object.tol)) },
             )
            ),
      /* beautify preserve:end */
      value: [],
      options: this.qcSelectables
        .filter(option => this.utils.mapData("nodeId")
          .includes(option.test))

    };
  }

  render() {
    const { qcobjects, value } = this.state;
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
