import React from 'react';

export default({nodes}) => (
  <div>{
    nodes.map(({value, timestamp, nodeId}) =>
      <span key={nodeId}>
        <p>{nodeId}</p>
        <p>{value}</p>
        <p>{timestamp}</p>
      </span>
    )
  }</div>
);
