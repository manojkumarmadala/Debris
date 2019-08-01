import React from 'react';
// import { Nav, NavItem } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
import Headers from './Header/Header';

function Header() {
	return (
		<div className="default-layout">
			<Headers isAuthenticated={false} />		
		</div>
		//<div>
			/* <Nav pullRight>
				<LinkContainer to="/">
					<NavItem eventKey={1}>Home</NavItem>
				</LinkContainer>
				<LinkContainer to="/competition">
					<NavItem eventKey={2}>Competition</NavItem>
				</LinkContainer>
				<LinkContainer to="/revenue">
					<NavItem eventKey={3}>Revenue</NavItem>
				</LinkContainer>
				<LinkContainer to="/chat">
					<NavItem eventKey={4}>Chat</NavItem>
				</LinkContainer>
				<LinkContainer to="/aiva">
					<NavItem eventKey={7}>AIVA</NavItem>
				</LinkContainer>
                <LinkContainer to="/agility">
                    <NavItem eventKey={2}>Agility</NavItem>
                </LinkContainer>
				<LinkContainer to="/incidents">
                    <NavItem eventKey={2}>Incidents</NavItem>
                </LinkContainer>
				<LinkContainer to="/availability">
                    <NavItem eventKey={2}>Availabililty</NavItem>
                </LinkContainer>
			</Nav>
		</div>
	); */
	);
}

export default Header;