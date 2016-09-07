import React from 'react';
import Collapse from './Collapse';
import './styles/Grid.css';
import './styles/Button.css';
import './styles/Toasts.css';

export default function({ selected, data, onDelete, onCollapse }) {

  function getRenderObjects(selected, data) {
    return selected.map(e => data.find(f => f.name === e))
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
            <div className="column col-6">Parameter</div>
            <div className="column col-5">Current value</div>
          </div>
        </article>
        {
        getRenderObjects(selected, data)
          .map(({name, ref, ist, tol, isOpen}) =>
          <article className="container" key={name}>
            <div className="columns">
              <div className="column col-6">{name}</div>
              <div className={`column col-2 ${alertStyling(name, ref, ist, tol)}`}>
                <span>{ist}</span>
              </div>
              <div className="column col-2">
                <button className="btn" onClick={onCollapse.bind(null, name)}>^</button>
              </div>
              <div className="column col-2">
                <button className="btn btn-primary" onClick={onDelete.bind(null, name)}>x</button>
              </div>
            </div>
            <Collapse isOpened={isOpen}>
              <div onClick={onCollapse.bind(null, name)} className="columns bg-grey">
                <div className="column col-2">⤷</div>
                <div className="column col-5">Ref: {ref}</div>
                <div className="column col-5">Tol: {tol}</div>
              </div>
            </Collapse>
          </article>
          )
        }
      </section>
  );
}
