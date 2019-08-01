var esClient = require('../elasticsearch/elasticsearch-client');

let getIncidentsByTimeframeData = async (product, trend,timeframe) => {
    let data;
    
    if (trend == "monthly") {
        let query = getMonthlyQuery(product,timeframe);
        data = await esClient.msearch(query);
    }
    if (trend == "weekly") {
        let query = getWeeklyQuery(product,timeframe);
        data = await esClient.msearch(query);
    }
    return data;
};

let dateRange = (timeframe) => {
    
let dayId=new Date(timeframe[1]).getDay();
let recentSunday = dayId == 0 ? new Date() : new Date(new Date(timeframe[1]).getTime() - ((dayId) * 60 * 60 * 24 * 1000))
let endDate = dateFormat(recentSunday)
let startDate=dateFormat(new Date(recentSunday.getTime()-41*60*60*24*1000))

return [startDate,endDate];
}

let dateFormat=(inputdate)=>{
    
        let date = new Date(inputdate),
            month = '' + (date.getMonth() + 1),
            day = '' + date.getDate(),
            year = date.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    
}
let getWeeklyQuery = (product,time) => {
    let products = product
    let index = "dataanalytics"
    let terms;
    let timeframe=time.split("T");
    let multiquery = new Array();
    if (product == "Insights") {
        products = ["Insights", "Unknown", "Reporting 2.0", "Spirit", "Pulse"]
        terms = {
            "PRODUCT.keyword": products
        }
    } else {
        index = "dataanalyticsplatform"
        terms = {
            "PRODUCT_CATEGORY.keyword": products
        }
    }
     multiquery.push({});
     multiquery.push({
            "size":0,
             "sort": [{
                 "CREATED_DATE": {
                     "order": "desc"
                 }
             }],

             "query": {
                 "bool": {

                     "must_not": [{
                         "match": {
                             "STATUS": {
                                 "query": "Duplicate Invalid",
                                 "operator": "or"
                             }

                         }
                     }],

                     "filter": [{
                             "terms":terms
                         },
                         {
                             "range": {
                                 "CREATED_DATE": {
                                     "gte": timeframe[0],
                                     "lte": timeframe[1],
                                     "format": "yyyy-MM-dd"
                                 }
                             }
                         }
                     ]


                 }
             },
             "aggs": {
                 "created": {
                     "date_histogram": {
                         "field": "CREATED_DATE",
                         "interval": "1w"
                     },
                     "aggs": {
                         "CLIENT": {
                             "terms": {
                                 "field": "CLIENT.keyword",
                                 "order": {
                                     "_term": "asc"
                                 },
                                 "size": 500
                             }
                         },
                         "STATUS": {
                             "terms": {
                                 "field": "STATUS.keyword",
                                 "order": {
                                     "_term": "asc"
                                 },
                                 "size": 500
                             }
                         },
                         "PRIORITY": {
                             "terms": {
                                 "field": "PRIORITY.keyword",
                                 "order": {
                                     "_term": "asc"
                                 },
                                 "size": 500
                             }
                         }

                     }
                 }
             }
         }

     );

     multiquery.push({})
     multiquery.push({
        "size":0,
         "sort": [{
             "RESOLVED_DATE": {
                 "order": "desc"
             }
         }],

         "query": {
             "bool": {

                 "must_not": [{
                     "match": {
                         "STATUS": {
                             "query": "Duplicate Invalid",
                             "operator": "or"
                         }

                     }
                 }],

                 "filter": [{
                         "terms":terms
                     },
                     {
                         "range": {
                             "RESOLVED_DATE": {
                                 "gte": timeframe[0],
                                 "lte": timeframe[1],
                                 "format": "yyyy-MM-dd"
                             }
                         }
                     }
                 ]


             }
         },
         "aggs": {
             "resolved": {
                 "date_histogram": {
                     "field": "RESOLVED_DATE",
                     "interval": "1w"
                 },
                 "aggs": {
                     "RCA_CLASSIFICATION": {
                         "terms": {
                             "field": "RCA_CLASSIFICATION.keyword",
                             "order": {
                                 "_term": "asc"
                             },
                             "size": 500
                         }
                     }
                 }
             }
         }
     });
    let query = {
        index: index,
        body: multiquery
    }
    return query;
}
let getMonthlyQuery = (product,time) => {
    let products = product
    let terms;
    let index = "dataanalytics"
    let multiquery = new Array();
    let timeframe = time.split("T");
    let weeklyRange=dateRange(timeframe);
    

    if (product == "Insights") {
        products = ["Insights", "Unknown", "Reporting 2.0", "Spirit", "Pulse"]
        terms = {
            "PRODUCT.keyword": products
        }
    } else {
        index = "dataanalyticsplatform"
        terms = {
            "PRODUCT_CATEGORY.keyword": products
        }
    }
     multiquery.push({});
     multiquery.push({
             "size": 0,
             "sort": [{
                 "CREATED_DATE": {
                     "order": "desc"
                 }
             }],

             "query": {
                 "bool": {

                     "must_not": [{
                         "match": {
                             "STATUS": {
                                 "query": "Duplicate Invalid",
                                 "operator": "or"
                             }

                         }
                     }],

                     "filter": [{
                             "terms": terms
                         },
                         {
                             "range": {
                                 "CREATED_DATE": {
                                     "gte": timeframe[0],
                                     "lte": timeframe[1],
                                     "format": "yyyy-MM-dd"
                                 }
                             }
                         }
                     ]


                 }
             },
             "aggs": {
                 "created": {
                     "date_histogram": {
                         "field": "CREATED_DATE",
                         "interval": "1M"
                     },
                     "aggs": {
                         "CLIENT": {
                             "terms": {
                                 "field": "CLIENT.keyword",
                                 "order": {
                                     "_term": "asc"
                                 },
                                 "size": 500
                             }
                         },
                         "STATUS": {
                             "terms": {
                                 "field": "STATUS.keyword",
                                 "order": {
                                     "_term": "asc"
                                 },
                                 "size": 500
                             }
                         },
                         "PRIORITY": {
                             "terms": {
                                 "field": "PRIORITY.keyword",
                                 "order": {
                                     "_term": "asc"
                                 },
                                 "size": 500
                             }
                         }

                     }
                 }
             }
         }

     );

     multiquery.push({})
     multiquery.push({
         "size": 0,
         "sort": [{
             "RESOLVED_DATE": {
                 "order": "desc"
             }
         }],

         "query": {
             "bool": {

                 "must_not": [{
                     "match": {
                         "STATUS": {
                             "query": "Duplicate Invalid",
                             "operator": "or"
                         }

                     }
                 }],

                 "filter": [{
                         "terms": terms
                     },
                     {
                         "range": {
                             "RESOLVED_DATE": {
                                 "gte": weeklyRange[0],
                                 "lte": weeklyRange[1],
                                 "format": "yyyy-MM-dd"
                             }
                         }
                     }
                 ]


             }
         },
         "aggs": {
             "resolved": {
                            "date_histogram": {
                             "field": "RESOLVED_DATE",
                             "interval": "1w"
                         },
                         "aggs": {
                             "RCA_CLASSIFICATION": {
                                 "terms": {
                                     "field": "RCA_CLASSIFICATION.keyword",
                                     "order": {
                                         "_term": "asc"
                                     },
                                     "size": 500
                                 }
                             }

                         }
                     }
                 }
             });
    multiquery.push({})
    multiquery.push({
        "size": 0,
        "sort": [{
            "RESOLVED_DATE": {
                "order": "desc"
            }
        }],

        "query": {
            "bool": {

                "must_not": [{
                    "match": {
                        "STATUS": {
                            "query": "Duplicate Invalid",
                            "operator": "or"
                        }

                    }
                }],

                "filter": [{
                        "terms": terms
                    },
                    {
                        "range": {
                            "RESOLVED_DATE": {
                                "gte": timeframe[0],
                                "lte": timeframe[1],
                                "format": "yyyy-MM-dd"
                            }
                        }
                    }
                ]


            }
        }

    });
     
    let query = {
        index: index,
        body: multiquery
    }
    return query;
}
module.exports = {
    getIncidentsByTimeframeData
};