import React from 'react';
import Collapse from './Collapse';
import './styles/spectre/Grid.css';
import './styles/spectre/Button.css';
import './styles/QualityControlNode.css';
import FaMinus from 'react-icons/lib/fa/minus';


export default function({ selected, data, onDelete, onCollapse }) {

  function getRenderObjects(selected, data) {
    return selected.map(e => data.find(f => f.name === e))
  }

  function alertStyling(ref, ist, tol) {
      if (ref + tol < ist || ref - tol > ist)
        return 'alert';
  }

  return (
    <section>
        {
        getRenderObjects(selected, data)
          .map(({name, ref, ist, tol, isOpen}) =>
          <article onClick={onCollapse.bind(null, name)} className="addedheight container" key={name}>
            <div className="columns">
              <div className="column col-1">
                <span className={`dropdown ${(isOpen) ? 'open' : ''}`}></span>
              </div>
              <div className="column col-6">
                <p>{name}</p>
              </div>
              <div className="column col-1">
                <span className={alertStyling(ref, ist, tol)}>{ist}</span>
              </div>
              <div className="column col-2">
                <div className={`alertsymbol ${alertStyling(ref, ist, tol)}`}></div>
              </div>
              <div className="column col-2">
                <button className="btn btn-primary" onClick={onDelete.bind(null, name)}>            <FaMinus />
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
