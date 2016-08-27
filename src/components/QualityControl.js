import React, { Component } from 'react';
import QualityControlNode from './QualityControlNode';
//import Select from 'react-select';
import uuid from 'uuid';
import './styles/Button.css';

export default class QualityControl extends Component {

  constructor(props) {
    super(props);
    this.state = {
      qualityControl: [
        {
          reactId: uuid.v4(),
          nodeId: 'PumpSpeed'
        }
      ]
    };
  }

  render() {
    const {opcData} = this.props;
    const {qualityControl} = this.state;
    return (
      <section>
        <h3>Quality Control Parameters</h3>
        <button className="btn btn-primary" 
          onClick={this.addQualityNode}>Add Parameter</button>
        <QualityControlNode
          renderNodes={qualityControl}
          opcData={opcData}
          onDelete={this.deleteQualityNode}
        />
      </section>
    );
  }

  addQualityNode = () => {
    this.setState({
      qualityControl:
        [...this.state.qualityControl,
          {
            reactId: uuid.v4(),
            nodeId: 'Temperature'
          }
        ]
    });
  }


  deleteQualityNode = (id, e) => {
    // stop event bubbling
    e.stopPropagation();

    this.setState({
      qualityControl: this.state.qualityControl.filter(node => node.reactId !== id)
    })
  }
}
