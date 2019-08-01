import React from 'react';
import IncidentsCore from '../../../../incidents/containers/Incidents';
import SideNav from '../../SideNav';
import {Row, Col} from 'react-bootstrap';

export default function Incidents(props){
	let products = ['24/7 Chat', '24/7 Active Share', 'AssistOps', 'Central'];
	return (
		<div>
			{/* <SideNav />                 */}
			<IncidentsCore sideNav={true} products={products} selectedProduct={products[0]}></IncidentsCore>
		</div>
	);
}