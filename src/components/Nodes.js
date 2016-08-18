import React, { Component } from 'react';
import Node from './Node';

export default class Nodes extends Component {

  render() {
    const {nodeData} = this.props; 

    return (
    <Node nodes={nodeData} />
    );
  }
}
