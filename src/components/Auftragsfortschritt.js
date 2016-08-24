import React from 'react';

export default function({opcData}) {

  const config  = {
    label: "Auftragsfortschritt",
    min: 0,
    max: 100,
    value: 40,
    width: 400,
    height: 220,
    color: '#283176',
    backgroundColor: "#edebeb",
    topLabelStyle: {textAnchor: "middle", fill:"#999999", stroke: "none", fontStyle: "normal",fontVariant: "normal", fontWeight: 'bold', fontStretch: 'normal', lineHeight: 'normal', fillOpacity: 1, fontSize: 30},
    valueLabelStyle: {textAnchor: "middle",  fill:"#010101", stroke: "none", fontStyle: "normal", fontVariant: "normal", fontWeight: 'bold', fontStretch: 'normal', lineHeight: 'normal', fillOpacity: 1, fontSize: 30},
    minMaxLabelStyle: {textAnchor: "middle", fill:"#999999", stroke: "none", fontStyle: "normal",fontVariant: "normal", fontWeight: 'normal', fontStretch: 'normal', fontSize: 20, lineHeight: 'normal', fillOpacity: 1}
  };

  function _getPathValues(value) {
    const dx = 0;
    const dy = 0;

    const alpha = (1 - (value - config.min) / (config.max - config.min)) * Math.PI;
    const Ro = config.width / 2 - config.width / 10;
    const Ri = Ro - config.width / 6.666666666666667;

    const Cx = config.width / 2 + dx;
    const Cy = config.height / 1.25 + dy;

    const Xo = config.width / 2 + dx + Ro * Math.cos(alpha);
    const Yo = config.height - (config.height - Cy) - Ro * Math.sin(alpha);
    const Xi = config.width / 2 + dx + Ri * Math.cos(alpha);
    const Yi = config.height - (config.height - Cy) - Ri * Math.sin(alpha);

    return {  Ro, Ri, Cx, Cy, Xo, Yo, Xi, Yi };
  };

  function _getPath(value) {

    const { Ro, Ri, Cx, Cy, Xo, Yo, Xi, Yi } = _getPathValues(value);

    const path = `M ${Cx - Ri}, ${Cy} 
                  L ${Cx - Ro}, ${Cy} 
                  A ${Ro}, ${Ro} 0 0 1 ${Xo}, ${Yo} 
                  L ${Xi}, ${Yi} 
                  A ${Ri}, ${Ri} 0 0 0 ${Cx - Ri}, ${Cy} 
                  Z `;

    return path;
  };

  const { Xo, Cy, Xi } = _getPathValues(config.max);

  return (
    <section>
    <h2 className="badge" data-badge="999 Schlechtteile">Auftragsfortschritt</h2>
    <svg viewBox={`0 0 ${config.width} ${config.height}`} style={{maxWidth: config.width}}>
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
    <path fill={config.backgroundColor} stroke="none" d={_getPath(config.max)} filter="url(#g3-inner-shadow)" />
    <path fill={config.color} stroke="none" d={_getPath(config.value)} filter="url(#g3-inner-shadow)" />
    <text style={config.valueLabelStyle}>
    <tspan x={config.width / 2} y={config.height / 1.6}>{ config.value }</tspan>
    <tspan x={config.width / 2} dy={30}>Gutteile</tspan>
    </text>
    <text x={(Xo + Xi)/2} y={Cy + 25} style={config.minMaxLabelStyle}>{ config.max }</text>
    </svg>
    </section>
    );
}
