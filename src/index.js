import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { ConnectedRouter } from 'connected-react-router'
import { IntlProvider } from 'react-intl';
import WebFont from 'webfontloader';
import { store, history } from './store'

import AppContainer from './containers/AppContainer';

import 'normalize.css';

WebFont.load({
  google: {
    families: [
      'Barlow:400,700,800',
      'Barlow Condensed:700',
      'Space Mono:700,700i',
    ]
  }
});

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale="en">
      <ConnectedRouter history={history}>
        <AppContainer />
      </ConnectedRouter>
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
