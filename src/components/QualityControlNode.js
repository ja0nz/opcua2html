import React from 'react';
import './styles/Table.css';
import './styles/Button.css';

export default function({ selected, data, onDelete }) {

  function getRenderObjects(selected, data) {
    return selected.map(item => data.find(node => node.name === item))

//    renderNodes.forEach((item, i) => {
//      rendering.push(
//        Object.assign({},
//          opcData.find(node => node.nodeId === item.nodeId),
//          { reactId: renderNodes[i].reactId }
//        )
//      );
//    });
//    return rendering;
  }

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Referenzwerte</th>
            <th>Istwerte</th>
          </tr>
        </thead>
        <tbody>{
        getRenderObjects(selected, data)
          .map(({name, ref, ist}) =>
            <tr className="selected" key={name}>
              <td>{name}</td>
              <td>{ref}</td>
              <td>{ist}</td>
              <td><button className="btn" onClick={onDelete.bind(null, name)}>x</button></td>
            </tr>)}
        </tbody>
      </table>
    );
}
