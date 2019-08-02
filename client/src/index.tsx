import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Deck from './Deck/Deck';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Deck />, document.getElementById('root'));
serviceWorker.unregister();
