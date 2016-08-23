import React, { Component } from 'react';
import QualityControlNode from './QualityControlNode';
import uuid from 'uuid';
import Button from './spectre/Button';

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
        <h2>Quality Control Parameters</h2>
        <Button primary={true} 
          onClick={this.addQualityNode}
        >+</Button>
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
