import React from 'react';
import HeatMap from '../../../../incidents/containers/HeatMap';
import SideNav from '../../SideNav';

export default function IncidentsHeatMap(){
	let product='24/7 Chat';

	return (
		<div>
			{/* <SideNav /> */}
			<HeatMap product={product} title={'Incidents Heatmap'}></HeatMap>;
		</div>
	);
}