import React, { Component } from 'react';
import QualityControlNode from './QualityControlNode';
import uuid from 'uuid';
import './styles/Button.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class QualityControl extends Component {


  constructor(props) {
    super(props);

    this.possibleSelectables = [
      { label: 'Zykluszeit', value: 't4012' },
      { label: 'Umschaltvolumen', value: 'V4065' },
      { label: 'max. Einspritzdruck', value: 'p4055' },
      { label: 'Umschaltspritzdruck', value: 'p4072' }
    ];

    this.api = {
      zykluszeit: ['t4011', 't4012', 't4013'],
      umschaltvolumen: ['V4064', 'V4065', 'V4066'],
      maxEinspritzdruck: ['p4054', 'p4055', 'p4056'],
      umschaltspritzdruck: ['p4071', 'p4072', 'p4073'],
    }

    this.referenzWerte = ['t4011', 'V4064', 'p4054', 'p4071'];
    this.istWerte = ['t4012', 'V4065', 'p4055', 'p4072'];
    this.toleranzWerte = ['t4013', 'V4066', 'p4056', 'p4073'];

    this.state = {
      //    qualityControl: Object.assign({}, this.api),
      qualityControl: [],
      value: "",
      disabled: false,
      options: []

    };
    const { opcData } = this.props;
    opcData.forEach((opc) =>
      this.possibleSelectables.forEach((select) => {
        if (select.value === opc.nodeId)
          this.state.options.push(select);
      })
    );

    /*
        Object.keys(this.api).forEach((key) =>
          this.api[key].forEach((apiNode, i) =>
            this.state.qualityControl[key][i] = opcData.find((opcNode) =>
              opcNode.nodeId === apiNode
            )
          )
        );

        */
  }

  render() {
    const { opcData } = this.props;
    const { qualityControl } = this.state;
    const { value, disabled } = this.state;
    return (
      <section>
        <h3>Quality Control Parameters</h3>
			  <div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select multi simpleValue value={this.state.value} placeholder="Select your nodes" options={this.state.options} onChange={this.addQualityNode} />
				
			</div>
        <QualityControlNode
          renderNodes={qualityControl}
          opcData={opcData}
          onDelete={this.deleteQualityNode}
        />
      </section>
    );
  }

  addQualityNode = (value) => {
   const currentNodes = value.split(',');

  function stateHandler(value) {
  
  
  }


    this.setState({
      qualityControl: [...this.state.qualityControl,
        {
          reactId: uuid.v4(),
          nodeId: stateHandler(currentNodes)
        }
      ],
      value
    });
  }


  deleteQualityNode = (id, e) => {}
}
