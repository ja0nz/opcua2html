import React, { Component } from 'react';
import Node from './Node';
import uuid from 'uuid';

export default class Nodes extends Component {

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
      <button onClick={this.addQualityNode}>+</button>
      <Node
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
