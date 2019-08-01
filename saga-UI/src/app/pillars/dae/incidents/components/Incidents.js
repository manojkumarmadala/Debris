import React from 'react';
import IncidentsCore from '../../../../incidents/containers/Incidents';

export default function Incidents(){
	let products = ['Insights', 'Reporting 2.0', 'BDP', 'RTDP', 'Spirit ', 'DP2'];
	return <IncidentsCore products={products} selectedProduct={products[0]}></IncidentsCore>;
}