import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, withRouter } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { connect, Provider } from 'react-redux';
import ScrollToTop from './container/util/ScrollToTop';
import './index.css';
import BlogReducer from './redux-saga-classes/reducer';
import rootSaga from './redux-saga-classes/sagas';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { getBlogList } from './redux-saga-classes/action';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(BlogReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const mapStateToProps = (state) => ({blogList: state});
const mapDispatchToProps = (dispatch) => ({getBlogList: () => dispatch(getBlogList())});
const BlogPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

ReactDOM.render((<BrowserRouter><ScrollToTop><Provider store={store}><BlogPage /></Provider></ScrollToTop></BrowserRouter>), document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
