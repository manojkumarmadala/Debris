import axiosInstance from '../axios/axios';

export default function getIncidentsData(product, severity, reportedBy, fromDate, toDate, environment) {

	let paramURL='';
	if (product !== undefined)
		paramURL += '?product=' + product;
	if (severity !== undefined)
		paramURL +='&severity='+severity;
	if (reportedBy !== undefined)
		paramURL += '&reportedBy=' + reportedBy;
	if (fromDate !== undefined)
		paramURL += '&from=' + fromDate;
	if (toDate !== undefined)
		paramURL += '&to=' + toDate;
	if (environment !== undefined)
		paramURL += '&environment=' + environment;
	if (product === undefined)
	{
		product = '24/7 Chat';
		paramURL += '?product=' + product;
	}
	
	let config = {
		params:{
			product,
			severity,
			reportedBy,
			fromDate,
			toDate,
			environment
		}
		
	};

	console.log(config);
	return axiosInstance.get('/incidents'+paramURL);
}

export function getIncidentsHeatMapData(product, severity, reportedBy, fromDate, toDate, environment){
	let config = {
		params:{
			product,
			severity,
			reportedBy,
			fromDate,
			toDate,
			environment
		}
	};
	return axiosInstance.get('/incidents/heatmap', config);
}

export function dae_getIncidentsData(product, trend){
	if (product === undefined)
		product = 'Insights';

	let config = {
		params: {
			product,
			trend
		}
	};
	return axiosInstance.get('/incidents', config);
	
}
export function dae_getIncidentsDrilldownData(product, trend,timeframe) {
	if (product === undefined)
		product = 'Insights';

	let config = {
		params: {
			product,
			trend,
			timeframe
		}
	};
	return axiosInstance.get('/incidents', config);
	
}