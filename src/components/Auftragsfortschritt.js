import React from 'react';
import Gauge from './Gauge';

export default function({opcData}) {

  const config  = {
    min: 0,
    max: 100,
    value: 40,
    width: 400,
    height: 220,
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

    return `M ${Cx - Ri}, ${Cy} L ${Cx - Ro}, ${Cy} A ${Ro}, ${Ro} 0 0 1 ${Xo}, ${Yo} L ${Xi}, ${Yi} A ${Ri}, ${Ri} 0 0 0 ${Cx - Ri}, ${Cy} Z`;
  };

 // const { Xo, Cy, Xi } = _getPathValues(config.max);

  return (
    <section>
    <h3>Produktionauftrag</h3>
    <h4 className="badge" data-badge="999 Schlechtteile">$Programmname / $Stueckzahl</h4>
    <Gauge
      config={config}
      pathbg={_getPath(config.max)}
      pathval={_getPath(config.value)}
    />
    </section>
  );
}
