import React from 'react';
import Button from './spectre/Button';
import Table from './spectre/Table';

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
      <Table striped>
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
            <tr key={reactId}>
              <td>{nodeId}</td>
              <td>{Math.round(value)}</td>
              <td>{timestamp}</td>
              <td><Button onClick={onDelete.bind(null, reactId)}>x</Button></td>
            </tr>)}
        </tbody>
      </Table>
    );
  } else return null;
}
