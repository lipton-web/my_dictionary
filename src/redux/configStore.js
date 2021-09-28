import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';


import dictionary from './modules/dictionary';

const middlewares = [thunk]; //미들웨어 하나로 묶기
const rootReducer = combineReducers({dictionary});
const enhancer =  applyMiddleware(...middlewares) //미들웨어 선택적인 아이들을 하나로 묶기


const store = createStore(rootReducer, enhancer);

export default store;