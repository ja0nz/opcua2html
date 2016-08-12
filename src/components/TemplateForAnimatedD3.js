/* 
 * This template is for defining d3 components that rely on transition events. Check if your d3 Block has the word "transition". This function animates your d3 block.
 * This template is written in a classic functional style and not in the new ES6 React.Component syntax as the new syntax doesn't support mixins which we are use here.
 */

var React = require('react');
var Faux = require('react-faux-dom');
var d3 = require('d3');

export default React.createClass({
  mixins: [Faux.mixins.core, Faux.mixins.anim],
  getInitialState: function () {
    return { data: this.props.data } // set OPC State Data
  },
  render: function () {
    return  <div>
      {this.state.gauge} // define state.gauge object
            </div>
  },
  componentDidMount: function () {
    // This will create a faux div and store its virtual DOM
    // in state.gauge
    var faux = this.connectFauxDOM('div', 'gauge')

    var component = this // this helper instead of this binding

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
