var esClient = require('../elasticsearch/elasticsearch-client');

let getIncidentsByTrendData = async (product, trend) => {
    let data;
    if(trend=="daily"){
  let query = getDailyQuery(product);
  data = await esClient.msearch(query);
}
 if (trend == "monthly") {
     let query = getMonthlyQuery(product);
     data = await esClient.msearch(query);
 }
 if (trend == "weekly") {
     let query = getWeeklyQuery(product);
     data = await esClient.msearch(query);
 }
return data;
};

let getDailyQuery = (product) => {
    let products=product
    let index="dataanalytics"
    let terms;
    let multiquery=new Array();
    if(product=="Insights")
    { products = ["Insights", "Unknown", "Reporting 2.0", "Spirit", "Pulse"]
         terms = {
             "PRODUCT.keyword": products
         }
         }
    else{
        index = "dataanalyticsplatform"
         terms = {
             "PRODUCT_CATEGORY.keyword": products
         }
    }
    multiquery.push({});
    multiquery.push( {
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
                            "range": {
                                "CREATED_DATE": {
                                    "gte": "now/M",
                                    "lte": "now",
                                    "format": "yyyy-MM-dd"
                                }
                            }
                        },
                        {
                            "terms": terms
                        }]


                    }
                },
                "aggs": {
                    "created": {
                        "date_histogram": {
                            "field": "CREATED_DATE",
                            "interval": "1d"
                        },
                        "aggs": {
                            "unique_count": {
                                "cardinality": {
                                    "field": "ISSUE_ID.keyword"
                                }
                            }
                        }
                    }
                }
            });
    multiquery.push({});
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
                            "range": {
                                "RESOLVED_DATE": {
                                    "gte": "now/M",
                                    "lte": "now",
                                    "format": "yyyy-MM-dd"
                                }
                            }
                        },
                        {
                            "terms": terms
                        }
                    ]


                }
            },
            "aggs": {
                "resolved": {
                    "date_histogram": {
                        "field": "RESOLVED_DATE",
                        "interval": "1d"
                    },
                    "aggs": {
                        "unique_count": {
                            "cardinality": {
                                "field": "ISSUE_ID.keyword"
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
let getWeeklyQuery = (product) => {
    let products = product
    let index = "dataanalytics"
    let terms;
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
                        "range": {
                            "CREATED_DATE": {
                                "gte": "now-8w/w",
                                "lte": "now/w",
                                "format": "yyyy-MM-dd"
                            }
                        }
                    },
                    {
                        "terms": terms
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
                    "unique_count": {
                        "cardinality": {
                            "field": "ISSUE_ID.keyword"
                        }
                    }
                }
            }
        }
    });
    multiquery.push({});
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
                        "range": {
                            "RESOLVED_DATE": {
                               "gte": "now-8w/w",
                               "lte": "now/w",
                                "format": "yyyy-MM-dd"
                            }
                        }
                    },
                    {
                        "terms": terms
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
                    "unique_count": {
                        "cardinality": {
                            "field": "ISSUE_ID.keyword"
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
let getMonthlyQuery=(product)=>{
      let products = product
      let terms;
      let index = "dataanalytics"
      let multiquery = new Array();

      
      if (product == "Insights") {
          products = ["Insights", "Unknown", "Reporting 2.0", "Spirit", "Pulse"]
          terms = {
              "PRODUCT.keyword": products
          }
      } else {
          index = "dataanalyticsplatform"
          terms={
              "PRODUCT_CATEGORY.keyword": products
          }
      }
       multiquery.push({});
       multiquery.push({
              "size": 0,
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
                      }]


                  },

              },
              "aggs": {

                  "created": {
                      "terms": {
                          "field": "INCIDENT_MONTH.keyword",
                          "min_doc_count": 0,
                          "size": 100,
                          "order": {
                              "_term": "asc"
                          }
                      }
                  },
                  "resolved": {
                      "terms": {
                          "field": "RESOLVED_MONTH.keyword",
                          "min_doc_count": 0,
                          "size": 100,
                          "order": {
                              "_term": "asc"
                          }
                      }
                  }




              }
          });
       multiquery.push({});
       multiquery.push({
           "size": 1000,
           "sort": [{
               "_uid": {
                   "order": "asc"
               }
           }],
           "query": {
               "bool": {
                   "must_not": [

                       {
                           "match": {
                               "STATUS": {
                                   "query": "Duplicate Resolved Closed Invalid Waiting*",
                                   "operator": "or"
                               }

                           }
                       },


                   ],
                   "filter": [{
                       "range": {
                           "CREATED_DATE": {
                               "gte": "now/y",
                               "lte": "now",
                               "format": "yyyy-MM-dd"
                           }
                       }
                   },
                {
                    "terms":terms
                }] }
           }
       })
     let query = {
         index: index,
         body: multiquery
     }
      return query;
}
module.exports = {
    getIncidentsByTrendData
};