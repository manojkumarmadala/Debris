var {getIncidentsData} = require('../DataAccessLayer/Incidents');


let getSeverityEntry = (title, severityEntries) =>{
    if(severityEntries[title] === undefined){
        let entry = {
            title : title,
            data : [],
            status : []
        }
        severityEntries[title] = entry;
        return entry;
    }
    else{
        return severityEntries[title];
    }
}

let getSeverityData = (dataSet) => {
    let sum=0;
    let status = {};
    dataSet.status.buckets.forEach(function(item){
        sum += item.issue.value;
        status[item.key] = item.issue.value;
    });

    return {sum, status};
}

let getIncidents = async (severity, reportedBy, from, to, environment, product, size) => {
    let response = await getIncidentsData(severity, reportedBy, from, to, environment, product, size);
    //business logic to modify the data received from elastic search

    let incidentsData = {
        product,
        IncidentMonths : [],
        severity : []
    }

    let dataSet = response.aggregations.incidents.buckets[0].created.buckets;
    let severityEntries = {};

    for(let i=dataSet.length-1; i>=0; i--){
        //push the month name into months array
        let monthIdentifier = dataSet[i].key.split('-');
        incidentsData.IncidentMonths.push(monthIdentifier[0]+'-'+monthIdentifier[2]);

        dataSet[i].severity.buckets.forEach(function(severityDataSet){
            let severityData = getSeverityData(severityDataSet);
            
            let severityEntry = getSeverityEntry(severityDataSet.key, severityEntries);
            severityEntry.data.push(severityData.sum);
            severityEntry.status.push(severityData.status);
        });
    }

    Object.keys(severityEntries).forEach(function(key){
        incidentsData.severity.push(severityEntries[key]);
    });
    
    return incidentsData;
};

module.exports = {
    getIncidents
};