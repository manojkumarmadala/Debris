import React from 'react';
import HeatMap from '../../../../incidents/containers/HeatMap';
import daeData from '../../dae-data.json';

export default function IncidentsHeatMap(){
	let product = daeData.incidentsHeatMapProduct;
	return <HeatMap product={product} title={'Incidents Heatmap'}></HeatMap>;
}