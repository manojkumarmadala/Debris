import React, {Component} from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { BrowserRouter as Router } from 'react-router-dom';

import Competition from './app/competition/containers/Competition';
import Revenue from './app/revenue/containers/Revenue';
import Chat from './app/chat/containers/ChatFunnel';
import AIVA from './app/aiva/containers/AIVAFunnel';
import Header from './app/Navigation';
import NotFound from './app/NotFound';
import Home from './app/home/containers/Home';
import {Route, Switch} from 'react-router';

import ACSAgility from './app/pillars/acs/agility/components/Agility';
import AIAgility from './app/pillars/ai/agility/components/Agility';
import ACSIncidentsHeatMap from './app/pillars/acs/incidents/components/IncidentsHeatMap';
import DAEIncidentsHeatMap from './app/pillars/dae/incidents/components/IncidentsHeatMap';
import ACSIncidents from './app/pillars/acs/incidents/components/Incidents';
import AIIncidents from './app/pillars/ai/incidents/components/Incidents';
import DAEIncidents from './app/pillars/dae/incidents/components/Incidents';
import Availability from './app/availability/containers/Availability';
import MonthlyTrend from './app/pillars/dae/incidents/containers/Trends';
import PersonWeeks from './app/personweeks/containers/PersonWeeks';
//import MonthlyTrend from './app/components/Bar';

import './App.css';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			sidenav: null
		};
	}

	render() {
		return ( 
			
			<Router>
				<div>
					<Header/>
					{this.state.sidenav}
					<div className = {'container-fluid pageContent'} >
						<Switch>
							<Route path = "/" exact component={Home}/> 
							<Route path = "/competition" component={Competition}/> 
							<Route path = "/revenue" component={Revenue}/> 
							<Route path = "/:pillar/agility"
								render = {
									(props) => {
										if (props.match.params.pillar == 'acs') {
											return <ACSAgility {
											...props
											}
											/>;
										} else if (props.match.params.pillar == 'ai') {
											return <AIAgility {
											...props
											}
											/>;
										} else {
											return <NotFound {
											...props
											}
											/>;
										}
									}
								}
							/> 
							<Route path = "/aiva" component={AIVA} exact />
							<Route path = "/acs/incidents/heatmap" component={ACSIncidentsHeatMap} exact />
							<Route path = "/dae/incidents/heatmap" component={DAEIncidentsHeatMap} exact />
							<Route path = "/dae/" component={MonthlyTrend} exact />
							<Route path = "/:pillar/incidents"
								render = {
									(props) => {
										if (props.match.params.pillar == 'acs') {
											return <ACSIncidents {
											...props
											}
											/>;
										} else if (props.match.params.pillar == 'ai') {
											return <AIIncidents {
											...props
											}
											/>;
										} else if (props.match.params.pillar == 'dae') {
											return <DAEIncidents {
											...props
											}
											/>;
										}
										else {
											return <NotFound {
											...props
											}
											/>;
										}
									}
								}
							/>

							<Route path = "/availability" component = {Availability}/> 
							<Route path = "/chat" component={Chat} exact />
							<Route path = "/temp" component={SideNav} exact />
							<Route path = '/personweeks' component={PersonWeeks} />
							<Route path = '*' component={NotFound} />
						</Switch> 
					</div> 
				</div>
			</Router>
		);
	}
}

export default App;