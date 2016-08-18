import React, { Component } from 'react';
import Node from './Node';
import uuid from 'uuid';

export default class Nodes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nodesToMount: [
        {
          id: uuid.v4(),
          component: <Node nodes={this.props.nodeData} />
        }
      ]
    }
  }


  render() {
    const {nodesToMount} = this.state;
    return (
      <section>
      <button onClick={this.addNode}>+</button>
      <div>{
        nodesToMount.map(({id, component}) =>
          <div key={id}>
          {component}
          </div>
        )}</div>
      </section>
    );
  }


  addNode = () => {
    this.setState({
      nodesToMount:
        [...this.state.nodesToMount,
          {
            id: uuid.v4(),
            component: <Node nodes={this.props.nodeData} />
          }
        ]
    });
  }




}
