import React from 'react';

export default({nodes}) => (
  <div>{nodes.map(({value, timestamp, nodeId}) =>
    <span>{value}</span>
    <span>{timeStamp}</span>
    <span>{nodeId}</span>
  )}</div>
)
