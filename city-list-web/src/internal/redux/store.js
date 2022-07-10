import { createStore, applyMiddleware } from "redux";
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const middleware = [thunk];
if (process.env.NODE_ENV === 'development') middleware.push(logger);

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
);