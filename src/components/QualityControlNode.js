import React from 'react';
import Collapse from './Collapse';
import './styles/Grid.css';
import './styles/Button.css';
import './styles/Toasts.css';

export default function({ selected, data, onDelete, onCollapse }) {

  function getRenderObjects(selected, data) {
    return selected.map(item => data.find(node => node.name === item))
  }

  function alertStyling(name, ref, ist, tol) {
  //  if (name !== "Zykluszeit")
      if (ref + tol < ist || ref - tol > ist)
        return 'toast toast-danger';
  }

  return (
    <section>
        <article className="container">
          <div className="columns">
            <div className="column col-5">Name</div>
            <div className="column col-5">Istwert</div>
          </div>
        </article>
        {
        getRenderObjects(selected, data)
          .map(({name, ref, ist, tol, isOpen}) =>
          <article className="container" key={name}>
            <div className="columns">
              <div className="column col-5">{name}</div>
              <div className={`column col-5 ${alertStyling(name, ref, ist, tol)}`}>
                <span>{ist}</span>
              </div>
              <div className="column col-1">
                <button className="btn" onClick={onCollapse.bind(null, name)}>^</button>
              </div>
              <div className="column col-1">
                <button className="btn btn-primary" onClick={onDelete.bind(null, name)}>x</button>
              </div>
            </div>
            <Collapse isOpened={isOpen}>
              <div onClick={onCollapse.bind(null, name)} className="columns bg-grey">
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
