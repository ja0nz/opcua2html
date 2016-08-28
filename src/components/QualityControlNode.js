import React from 'react';
import './styles/Table.css';
import './styles/Button.css';

export default function({ renderNodes, opcData, onDelete }) {

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
      <table className="table table-striped">
        <thead>
          <tr>
            <th>NodeId</th>
            <th>Value</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>{
        getRenderObjects(renderNodes, opcData)
          .filter(item => item.nodeId !== undefined)
          .map(({value, timestamp, nodeId, reactId}) =>
            <tr className="selected" key={reactId}>
              <td>{nodeId}</td>
              <td>{Math.round(value)}</td>
              <td>{timestamp}</td>
              <td><button className="btn" onClick={onDelete.bind(null, reactId)}>x</button></td>
            </tr>)}
        </tbody>
      </table>
    );
  } else return null;
}
