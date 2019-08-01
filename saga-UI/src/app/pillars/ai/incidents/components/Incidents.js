import React from 'react';
import IncidentsCore from '../../../../incidents/containers/Incidents';

export default function Incidents(){
	let products = ['24/7 AIVA', 'IVR', 'IntelliResponse (VA)', 'Speech - IVR', 'Speech ', 'Speech - CE'];
	return <IncidentsCore products={products} selectedProduct={products[0]}></IncidentsCore>;
}