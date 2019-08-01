import React from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
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
            <NavItem eventKey="competition">
                <NavIcon>
                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Competition
                </NavText>
            </NavItem>
            <NavItem eventKey="revenue">
                <NavIcon>
                    <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Revenue
                </NavText>
            </NavItem>
        </SideNav.Nav>
    </SideNav>

        </React.Fragment>
	)}
/>);
}