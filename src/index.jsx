import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

/* -------------------------------------------------------------------------- */

const render = () => {
  const Root = require('config/Root').default;

  ReactDOM.render(
    <StrictMode>
      <Root />
    </StrictMode>,
    document.getElementById('root'),
  );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('config/Root', render);
}
