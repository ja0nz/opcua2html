import React from 'react';
import Collapse from './Collapse';
import './styles/Grid.css';
import './styles/Button.css';

export default function({ selected, data, onDelete, onCollapse }) {

  function getRenderObjects(selected, data) {
    return selected.map(item => data.find(node => node.name === item))
  }

    return (
      <section>
        <article className="container">
          <div className="columns">
            <div className="column col-4">Name</div>
            <div className="column col-4">Istwert</div>
          </div>
        </article>
        {
        getRenderObjects(selected, data)
          .map(({name, ref, ist, tol, isOpen}) =>
          <article className="container" key={name}>
            <div className="columns">
              <div className="column col-4">{name}</div>
              <div className="column col-4">{ist}</div>
              <div className="column col-4">
                <button className="btn" onClick={onCollapse.bind(null, name)}>^</button>
                <button className="btn" onClick={onDelete.bind(null, name)}>x</button>
              </div>
            </div>
            <Collapse isOpened={isOpen}>
              <div className="columns">
                <div className="column col-4">More Data:</div>
                <div className="column col-4">Referenzwert: {ref}</div>
                <div className="column col-4">Toleranzwert: {tol}</div>
              </div>
            </Collapse>
          </article>
          )
        }
      </section>
    );
}
