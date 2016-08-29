import React from 'react';
import './styles/Gauge.css';

export default ({ config, pathbg, pathval }) => (

  <svg viewBox={`0 0 ${config.width} ${config.height}`} className="gauge">
    <defs>
      <filter id="g3-inner-shadow">
        <feOffset dx="0" dy="3" />
        <feGaussianBlur result="offset-blur" stdDeviation="5" />
        <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
        <feFlood floodColor="black" floodOpacity="0.2" result="color" />
        <feComposite operator="in" in="color" in2="inverse" result="shadow" />
        <feComposite operator="over" in="shadow" in2="SourceGraphic" />
      </filter>
    </defs>
    <path className="gauge-bg" d={pathbg} filter="url(#g3-inner-shadow)" />
    <path className="gauge-val" d={pathval} filter="url(#g3-inner-shadow)" />
    <text className="gutteile">
      <tspan x={config.width / 2} y={config.height / 1.6}>{ config.value }</tspan>
      <tspan x={config.width / 2} dy={30}>Gutteile</tspan>
    </text>
  {//<text x={(Xo + Xi)/2} y={Cy + 25} style={config.minMaxLabelStyle}>{ config.max }</text>
  }
  </svg>
);
