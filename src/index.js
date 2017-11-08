import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import reducers from './reducers';
import thunk from 'redux-thunk';
import App from './containers/App';
import registerServiceWorker from './lib/registerServiceWorker';

import SingleItemView from './containers/SingleItemView';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>

        <Route exact path="/" component={App} />
        <Route path="/items/:id" component={SingleItemView} />

      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
