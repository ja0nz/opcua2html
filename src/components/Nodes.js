import React, { Component } from 'react';
import Node from './Node';

export default class Nodes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nodeVisible : false
    };
  }
  render() {
    return (
      <section>
      <button onClick={this.toggleNode}>+</button>
      {this.state.nodeVisible ? <Node nodes={this.props.nodeData} /> : null}
      </section>
    );
  }

  toggleNode = () => this.setState({nodeVisible: !this.state.nodeVisible})
}

/*
 addNode = () => {
 this.setState({
 mountedNotes:
 [...this.state.mountedNotes,
 {
// change uuid to selector
id: uuid.v4(),
component: <Node nodes={this.componentProps || this.props.nodeData} />,
componentProps: this.props.nodeData
}
]
});
}


deleteNode = (id, e) => {
// stop event bubbling
e.stopPropagation();

this.setState({
mountedNotes: this.state.mountedNotes.filter(node => node.id !== id)
});
}
*/
