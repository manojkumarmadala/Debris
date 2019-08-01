var esClient = require('../elasticsearch/elasticsearch-client');

let getHeatmapData = async ( product) => {
    let query = getHeatmapQuery( product);

    let data = await esClient.search(query);
    return data;
};

let getHeatmapQuery = ( product) => {
    let index;
    var product_query;
    if(product.includes("24/7 Chat"))
    {index="jiracloud";
    product_query = {
        "terms": {
            "PRODUCT_ORIGINAL.keyword": product
        }
    }
    }
    else 
    {
    index="dataanalytics";
    product_query=	{
                    "terms": {
                    "PRODUCT.keyword": product
                            }
                     }
    }
    let query = {
        index: index,
        type: 'prodincidents',
        body: {
            "size": "0",
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
                        },
                        {
                            "match": {
                                "REPORTED_BY": "Monitors"
                            }
                        }

                    ],
                    

                    "filter": [{
                            "range": {
                                "CREATED_DATE": {
                                    "gte": "now-5M/M",
                                    "lte": "now/M",
                                    "format": "yyyy-MM-dd"
                                }
                            }
                        },
                        {
                            "script": {
                                "script": {
                                    "source": "doc['_uid'].value.length()<=25",
                                    "lang": "painless",

                                }
                            }
                        },
                        product_query
                    ]

                }
            },
            "aggs": {
                "client": {
                    "terms": {
                        "field": "CLIENT.keyword",
                        "order": {
                            "_term": "asc"
                        },
                        "size": 500
                    },
                    "aggs": {
                        "month": {
                            "terms": {
                                "field": "INCIDENT_MONTH.keyword",
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
    };
    
    return query;
}
module.exports = {
    getHeatmapData
};