import React from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import './sidenav.css';
import {Route} from 'react-router';

export default function SideNavComponent(props){
	return (
		<Route render={({ location, history }) => (
			<React.Fragment>
				<SideNav defaultExpanded={true}
					onSelect={(selected) => {
						const to = '/' + selected;
						if (location.pathname !== to) {
							history.push(to);
						}
					}}
				>
					<SideNav.Toggle />
					<SideNav.Nav defaultSelected="home">
						<NavItem eventKey="availability">
							<NavIcon>
								<i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
							</NavIcon>
							<NavText>
                    Availability
							</NavText>
						</NavItem>
						<NavItem eventKey="acs/agility">
							<NavIcon>
								<i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
							</NavIcon>
							<NavText>
                    Agility
							</NavText>
						</NavItem>
						<NavItem eventKey="acs/incidents">
							<NavIcon>
								<i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
							</NavIcon>
							<NavText>
                    Incidents
							</NavText>
						</NavItem>
						<NavItem eventKey="acs/incidents/heatmap">
							<NavIcon>
								<i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
							</NavIcon>
							<NavText>
                    Incidents Heatmap
							</NavText>
						</NavItem>
					</SideNav.Nav>
				</SideNav>

			</React.Fragment>
		)}
		/>);
}