import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class QualityControl extends Component {

  static propTypes = { label: React.PropTypes.string };

  constructor(props) {
    super(props);

    this.possibleSelectables = [
      { label: 'Zykluszeit', value: 't4012' },
      { label: 'Umschaltvolumen', value: 'V4065' },
      { label: 'max. Einspritzdruck', value: 'p4055' },
      { label: 'Umschaltspritzdruck', value: 'p4072' }
    ];

    this.state = {
      disabled: false,
      options: [],
    };

    const { opcData } = this.props;
    opcData.forEach((opc) =>
      this.possibleSelectables.forEach((select) => {
        if (select.value === opc.nodeId)
          this.state.options.push(select);
      })
    );
  }

  render() {
    return (
      <div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select multi simpleValue disabled={this.props.disabled} value={this.props.currentValue} placeholder="Select your nodes" options={this.state.options} onChange={onChangeHandler.bind(null, value)} />
				
			</div>
    );
  }


}
