var {
    getIncidentsByTimeframeData
} = require('../DataAccessLayer/IncidentsDrilldown');




let getIncidentsByTimeframe = async (product, trend,timeframe) => {
    let response = await getIncidentsByTimeframeData(product, trend,timeframe);
   let result;

   if (trend == "weekly") {
       result = generateWeeklyData(response, product);
   }
   if (trend == "monthly") {
       result = generateMonthlyData(response, product);
   }
   return result;
   };

let generateWeeklyData = (response, product) => {

    return({
"product":product[0],
"trend":"weekly",  
"created": response.responses[0].hits.total,
"resolved":response.responses[1].hits.total,   
"categories":[
    {
        "type":"Status",
        "data": response.responses[0].aggregations.created.buckets.length>0?response.responses[0].aggregations.created.buckets[0].STATUS.buckets:"Empty Bucket"
    },
    {
        "type": "Priority",
        "data": response.responses[0].aggregations.created.buckets.length > 0 ? response.responses[0].aggregations.created.buckets[0].PRIORITY.buckets : "Empty Bucket"

    },
    {
        "type": "Client",
        "data": response.responses[0].aggregations.created.buckets.length > 0 ? response.responses[0].aggregations.created.buckets[0].CLIENT.buckets : "Empty Bucket"
    },
    {
        "type": "RCA",
        "data": response.responses[1].aggregations.resolved.buckets.length > 0 ? response.responses[1].aggregations.resolved.buckets[0].RCA_CLASSIFICATION.buckets : "Empty Bucket"
    }
]})

}
 let generateMonthlyData = (response, product) => {
let dates=[],seriesvalue=[];

let seriesname = ['Insights pipeline issues', 'Infra issues', 'R2.0', 'False Alarm', 'None', 'Others']
    response.responses[1].aggregations.resolved.buckets.forEach(element => {
        dates.push(element.key_as_string.split("T")[0]);
        var insights = 0;
        var infra = 0;
        var r2 = 0;
        var falsealarm = 0;
        var notSet = 0;
        var others = 0;
        element.RCA_CLASSIFICATION.buckets.forEach(element=>{
            if (element.key == "Data Processing-Spirit" || element.key == "Data Processing-OLAP" || element.key == "Data Processing-Chronos") {
                insights+=element.doc_count;
            } else if (element.key == "Data Generation - > Infra" || element.key == "Data Generation-Infra" || element.key == "Data Processing-Infra") {
                infra+=element.doc_count;
            } else if (element.key == "R2.0") {
                r2+=element.doc_count;
            } else if (element.key.includes("False")) {
                falsealarm+=element.doc_count;
            } else if (element.key.includes("None")) {
               notSet+=element.doc_count;
            } else {
                others+=element.doc_count;
            }
        })
seriesvalue.push([insights,infra,r2,falsealarm,notSet,others]);
    });


return ({
    "product": product[0],
    "trend": "monthly",
    "created": response.responses[0].aggregations.created.buckets.length>0? response.responses[0].aggregations.created.buckets[0].doc_count : 0,
    "resolved": response.responses[2].hits.total,
    "categories": [{
            "type": "Status",
            "data": response.responses[0].aggregations.created.buckets.length > 0 ? response.responses[0].aggregations.created.buckets[0].STATUS.buckets : "Empty Bucket"
        },
        {
            "type": "Priority",
            "data": response.responses[0].aggregations.created.buckets.length > 0 ? response.responses[0].aggregations.created.buckets[0].PRIORITY.buckets : "Empty Bucket"

        },
        {
            "type": "Client",
            "data": response.responses[0].aggregations.created.buckets.length > 0 ? response.responses[0].aggregations.created.buckets[0].CLIENT.buckets : "Empty Bucket"
        },
        {
            "type": "RCA",
            "data": response.responses[1].aggregations.resolved.buckets.length > 0 ? {
                "labels":dates,
                "seriesname":seriesname,
                "seriesvalue":seriesvalue
            } :"Empty Bucket"
        }

    ]

})

}


module.exports = {
    getIncidentsByTimeframe
};