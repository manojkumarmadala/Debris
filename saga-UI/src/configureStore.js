import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import competitionReducer from './app/state/competition-reducer';
import RevenueReducer from './app/state/revenue-reducer';
import agilityReducer from './app/state/agility-reducer';
import incidentsReducer from './app/state/incidents-reducer';
import aivaReducer from './app/state/aiva-reducer';
import availabilityReducer from './app/state/availability-reducer';
import incidentsHeatMapReducer from './app/state/incidents-heatmap-reducer';
import incidentsDaeReducer from './app/state/incidents-dae-reducer';
import incidentsDaeDrilldownReducer from './app/state/incidents-dae-drilldown-reducer';
import personWeeksReducer from './app/state/personweeks-reducer';

import chatReducer from './app/state/chat-reducer';
import logger from 'redux-logger';

export default function configureStore() {
	const rootReducer = combineReducers({
		competitionReducer,
		RevenueReducer,
		agilityReducer,
		incidentsReducer,
		aivaReducer,
		availabilityReducer,
		chatReducer,
		incidentsHeatMapReducer,
		incidentsDaeReducer,
		incidentsDaeDrilldownReducer,
		personWeeksReducer
	});

	const store = createStore(rootReducer, applyMiddleware(thunk, logger));
	return store;
}
