import React from 'react';

export default function({renderNodes, opcData, onDelete}) {

function getRenderObjects(renderNodes, opcData) {
  const rendering = [];
  renderNodes.forEach((item, i) => {
    rendering.push( 
      Object.assign({},
        opcData.find(node => node.nodeId === item.nodeId),
        { reactId: renderNodes[i].reactId }
      )
    );
  });
  return rendering;
}

  if (renderNodes.length > 0) {
    return (
      <div>{
        getRenderObjects(renderNodes, opcData)
          .filter(item => item.nodeId !== undefined)
          .map(({value, timestamp, nodeId, reactId}) =>
          <span key={reactId}>
            <p>{nodeId}</p>
            <p>{value}</p>
            <p>{timestamp}</p>
            <button onClick={onDelete.bind(null, reactId)}>x</button>
          </span>
          )
      }</div>
    );
  } else return null;
}
