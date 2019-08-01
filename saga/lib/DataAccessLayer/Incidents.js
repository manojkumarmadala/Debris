var esClient = require('../elasticsearch/elasticsearch-client');

let getIncidentsData = async (severity, reportedBy, from, to, environment, product, size) => {
    let query = getIncidentsQuery(severity, reportedBy, from, to, environment, product, size);

    let data = await esClient.search(query);
    return data;
};

let getIncidentsQuery = (severity, reportedBy, from, to, environment, product, size) => {
    
    let query = {
        index: 'jiracloud',
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
                    "must": [{
                            "match_all": {}
                        },
                        {
                            "match": {
                                "ENVIRONMENT": {
                                    "query": environment,
                                    "operator": "or"
                                }
                            }
                        },
                        {
                            "bool": {
                                "minimum_should_match": 1,
                                "should": [{
                                    "match": {
                                        "REPORTED_BY": {
                                            "query": reportedBy,
                                            "operator": "or"
                                        }
                                    }
                                }]
                            }
                        },
                    ],
                    "must_not": [{
                        "match": {
                            "STATUS": {
                                "query": "Invalid Duplicate",
                                "operator":"or"
                            }
                        }
                    }],
                    "filter":[{
                        "terms": {
                            "PRODUCT_ORIGINAL.keyword": product
                        }
                    }]
                },
            },
            "size": 0,
            "_source": {
                "excludes": []
            },
            "aggs": {
                "incidents": {
                    "date_range": {
                        "field": "CREATED_DATE",
                        "ranges": [{
                            "from": from,
                            "to": to,
                            "format":"yyyy-MM-dd"
                        }]
                    },
                    "aggs": {
                        "created": {
                            "terms": {
                                "field": "INCIDENT_MONTH.keyword",
                                "size": size, //size
                                "order": {
                                    "_term": "desc"
                                },
                                "min_doc_count": 0
                            },
                            "aggs": {
                                "severity": {
                                    "terms": {
                                        "field": "SEVERITY.keyword",
                                        "include": severity,

                                        "order": {
                                            "_term": "asc"
                                        },
                                        "min_doc_count": 0
                                    },
                                    "aggs": {
                                        "status": {
                                            "terms": {
                                                "field": "STATUS.keyword",
                                                "size": 10,
                                                "order": {
                                                    "_term": "desc"
                                                }
                                            },
                                            "aggs": {
                                                "issue": {
                                                    "cardinality": {
                                                        "field": "ISSUE_ID"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

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
    getIncidentsData
};