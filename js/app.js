import React from 'react';
import ReactDOM from 'react-dom';
import Gecko from './gecko';
import 'normalize.css';
import '../style.css';

let node = document.getElementById('app');
ReactDOM.render(<Gecko />, node);