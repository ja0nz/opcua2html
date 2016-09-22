import React from 'react';
import Collapse from './Collapse';
import Close from 'react-icons/lib/md/close';
import Warning from 'react-icons/lib/md/warning';
import Details from 'react-icons/lib/md/details';
import './styles/spectre/Grid.css';
import './styles/spectre/Button.css';
import './styles/QualityControlNode.css';

export default function({ selected, data, onDelete, onCollapse }) {

  function getRenderObjects(selected, data) { // filter the objects which are selected by the user in the select component
    return selected.map(e => data.find(f => f.name === e))
  }

  function alertStyling(ref, ist, tol) {
    if (ref + tol < ist || ref - tol > ist)
      return 'alert';
  }

  return (
    <section className="qcn">
        {
        getRenderObjects(selected, data)
          .map(({name, ref, ist, tol, isOpen}) =>
          <article onClick={onCollapse.bind(null, name)} className="addedheight container" key={name}>
            <div className="columns">
              <div className="column col-1">
                <Details className={`dropdown ${(isOpen) ? 'open' : ''}`}></Details>
              </div>
              <div className="column col-6">
                <p>{name}</p>
              </div>
              <div className="column col-3">
                <span className={alertStyling(ref, ist, tol)}>{ist}</span>
                <Warning className={`warning ${alertStyling(ref, ist, tol)}`}></Warning>
              </div>
              <div className="column col-2">
                <div></div>
                <button className="btn btn-primary" onClick={onDelete.bind(null, name)}>
                  <Close />
                </button>
              </div>
            </div>
            <Collapse isOpened={isOpen}>
              <div  className="columns bg-grey">
                <div className="column col-2"></div>
                <div className="column col-5">Referenzwert</div>
                <div className="column col-5">{ref}</div>
              </div>
              <div className="columns bg-grey">
                <div className="column col-2"></div>
                <div className="column col-5">Toleranzwert</div>
                <div className="column col-5">{tol}</div>
              </div>
            </Collapse>
          </article>
          )
        }
      </section>
  );
}
