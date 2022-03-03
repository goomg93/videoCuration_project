import { combineReducers } from 'redux';
import ListStates from './ListStates';
import DetailStates from './DetailStates';

const allReducers = combineReducers({ ListStates, DetailStates });

export default allReducers;
