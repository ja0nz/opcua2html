import React from 'react';
import './styles/Footer.css';

export default () => (
          <footer className="bg-grey">
            <h6>Industrie 4
              <svg className="svgfooter" viewBox="0 0 100 100">
                <circle id="one" r="40" cx="50" cy="50" />
                <circle id="two" r="30" cx="50" cy="50" />
                <circle id="three" r="20" cx="50" cy="50" />
                <circle id="four" r="10" cx="50" cy="50" />
              </svg>0 | <a href="http://www.fhws.de">FHWS</a></h6>
          </footer>
    );
