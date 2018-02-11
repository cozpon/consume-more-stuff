import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom';
import reducers from './reducers';
import thunk from 'redux-thunk';
import './index.scss';
//---------------------------------------
import App from './containers/App';
import User from './containers/User';
import Register from './containers/Register';
import LogIN from './containers/LogIN';
import LogOUT from './containers/LogOUT';
import SideBar from './containers/SideBar';
import SingleItemView from './containers/SingleItemView';
import Footer from './components/footer.components';
import Nav from './components/nav.components';
//---------------------------------------
import registerServiceWorker from './lib/registerServiceWorker';

// ------STORE--------
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);
// ------STORE--------


ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale="en">
    <Router>
      <div id="source">
        <header id="global-nav-header">
          <SideBar />

            <div id="logo">
              <Link to="/"><div></div></Link>
            </div>

          <Nav />
        </header>
        <Route exact path="/" component={App} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={LogIN} />
        <Route path="/items/:id" component={SingleItemView} />
        <Route path="/logout" component={LogOUT} />
        <Route path="/users/:id" component={User}/>
        <Footer />
      </div>
    </Router>
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
