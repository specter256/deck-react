import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import * as serviceWorker from './serviceWorker';
import Deck from 'containers/Deck/Deck';
import { store } from 'store/store';

import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <Deck />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
