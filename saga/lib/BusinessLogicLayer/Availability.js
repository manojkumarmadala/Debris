
var Promise = require('promise');
var {getAvailabilityData} = require('../DataAccessLayer/Availability');

let getAvailabilityDataResponse = async (platform, monthRange) => {

	let data = await getAvailabilityData(platform, monthRange);
let months=[];
let availability=[];
let expected=[];
for (let i = data.aggregations.incident_month.buckets.length-1; i >=0; i--) {
let monthEntry = data.aggregations.incident_month.buckets[i];
let monthName = monthEntry.key.split('-');
months.push(monthName[2].substring(0,3)+'-'+monthName[0].substring(2,4));
availability.push(parseFloat(monthEntry.platform.buckets[0].availability.value.toFixed(2)));
expected.push(parseFloat(monthEntry.platform.buckets[0].expected.value.toFixed(2)));

}

return {'months':months,'availability':availability,'expected':expected,'platform':platform};
};



module.exports = {
	getAvailabilityDataResponse
};