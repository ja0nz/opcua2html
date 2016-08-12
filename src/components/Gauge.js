/*
 * This template is for defining d3 components that rely on transition events. Check if your d3 Block has the word "transition". This function animates your d3 block.
 * This template is written in a classic functional style and not in the new ES6 React.Component syntax as the new syntax doesn't support mixins which we are use here.
 */

var React = require('react');
var Faux = require('react-faux-dom');
var d3 = require('d3');
import './Gauge.css';

export default React.createClass({
  mixins: [Faux.mixins.core, Faux.mixins.anim],
  getInitialState: function () {
    return { data: this.props.data } // set OPC State Data
  },
  render: function () {
    return  <div id="power-gauge">
    {this.state.gauge} // define state.gauge object
    </div>
  },
  componentDidMount: function () {
    // This will create a faux div and store its virtual DOM
    // in state.gauge
    var faux = this.connectFauxDOM('div', 'gauge');

    var component = this; // this helper instead of this binding

    /*
     D3 code like normal. Just watch for theses Statements

     1) d3.select(node) --> insert faux node instead of normal DOM node
     2) calling this.animateFauxDOM(approxDurationOfTransitionInMilliseconds) after each animation kickoff
     f.e.
     rect.transition() //kickoff
     .delay(function (d, i) { return i * 10 })
     .attr('y', function (d) { return y(d.y0 + d.y) })
     .attr('height', function (d) { return y(d.y0) - y(d.y0 + d.y) });
     component.animateFauxDOM(800);
     */

    var gauge = function(container, configuration) {
      var that = {};
      var config = {
        size            : 200,
        clipWidth         : 200,
        clipHeight          : 110,
        ringInset         : 20,
        ringWidth         : 20,

        pointerWidth        : 10,
        pointerTailLength     : 5,
        pointerHeadLengthPercent  : 0.9,

        minValue          : 0,
        maxValue          : 10,

        minAngle          : -90,
        maxAngle          : 90,

        transitionMs        : 750,

        majorTicks          : 5,
        labelFormat         : d3.format(',g'),
        labelInset          : 10,

        arcColorFn          : d3.interpolateHsl(d3.rgb('#e8e2ca'), d3.rgb('#3e6c0a'))
      };
      var range = undefined;
      var r = undefined;
      var pointerHeadLength = undefined;
      var value = 0;

      var svg = undefined;
      var arc = undefined;
      var scale = undefined;
      var ticks = undefined;
      var tickData = undefined;
      var pointer = undefined;

      var donut = d3.layout.pie();

      function deg2rad(deg) {
        return deg * Math.PI / 180;
      }

      function newAngle(d) {
        var ratio = scale(d);
        var newAngle = config.minAngle + (ratio * range);
        return newAngle;
      }

      function configure(configuration) {
        var prop = undefined;
        for ( prop in configuration ) {
          config[prop] = configuration[prop];
        }

        range = config.maxAngle - config.minAngle;
        r = config.size / 2;
        pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

        // a linear scale that maps domain values to a percent from 0..1
        scale = d3.scale.linear()
          .range([0,1])
          .domain([config.minValue, config.maxValue]);

        ticks = scale.ticks(config.majorTicks);
        tickData = d3.range(config.majorTicks).map(function() {return 1/config.majorTicks;});

        arc = d3.svg.arc()
          .innerRadius(r - config.ringWidth - config.ringInset)
          .outerRadius(r - config.ringInset)
          .startAngle(function(d, i) {
            var ratio = d * i;
            return deg2rad(config.minAngle + (ratio * range));
          })
          .endAngle(function(d, i) {
            var ratio = d * (i+1);
            return deg2rad(config.minAngle + (ratio * range));
          });
      }
      that.configure = configure;

      function centerTranslation() {
        return 'translate('+r +','+ r +')';
      }

      function isRendered() {
        return (svg !== undefined);
      }
      that.isRendered = isRendered;

      function render(newValue) {
        svg = d3.select(container)
          .append('svg:svg')
          .attr('class', 'gauge')
          .attr('width', config.clipWidth)
          .attr('height', config.clipHeight);

        var centerTx = centerTranslation();

        var arcs = svg.append('g')
          .attr('class', 'arc')
          .attr('transform', centerTx);

        arcs.selectAll('path')
          .data(tickData)
          .enter().append('path')
          .attr('fill', function(d, i) {
            return config.arcColorFn(d * i);
          })
          .attr('d', arc);

        var lg = svg.append('g')
          .attr('class', 'label')
          .attr('transform', centerTx);
        lg.selectAll('text')
          .data(ticks)
          .enter().append('text')
          .attr('transform', function(d) {
            var ratio = scale(d);
            var newAngle = config.minAngle + (ratio * range);
            return 'rotate(' +newAngle +') translate(0,' +(config.labelInset - r) +')';
          })
          .text(config.labelFormat);

        var lineData = [ [config.pointerWidth / 2, 0],
          [0, -pointerHeadLength],
          [-(config.pointerWidth / 2), 0],
          [0, config.pointerTailLength],
          [config.pointerWidth / 2, 0] ];
        var pointerLine = d3.svg.line().interpolate('monotone');
        var pg = svg.append('g').data([lineData])
          .attr('class', 'pointer')
          .attr('transform', centerTx);

        pointer = pg.append('path')
          .attr('d', pointerLine/*function(d) { return pointerLine(d) +'Z';}*/ )
          .attr('transform', 'rotate(' +config.minAngle +')');

        update(newValue === undefined ? 0 : newValue);
      }
      that.render = render;

      function update(newValue, newConfiguration) {
        if ( newConfiguration  !== undefined) {
          configure(newConfiguration);
        }
        var ratio = scale(newValue);
        var newAngle = config.minAngle + (ratio * range);
        pointer.transition()
          .duration(config.transitionMs)
          .ease('elastic')
          .attr('transform', 'rotate(' +newAngle +')');

        component.animateFauxDOM(1000);
      }
      that.update = update;

      configure(configuration);

      return that;
};

var powerGauge = gauge(faux, {
  size: 300,
  clipWidth: 300,
  clipHeight: 300,
  ringWidth: 60,
  maxValue: 10,
  transitionMs: 4000,
});
powerGauge.render();
powerGauge.update(this.state.data);

}
});
