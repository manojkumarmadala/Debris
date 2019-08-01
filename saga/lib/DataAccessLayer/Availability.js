var esClient = require('../elasticsearch/elasticsearch-client');

let getAvailabilityData = async (platform,monthRange) => {
	let query = getAvailabilityQuery(platform, monthRange);

	let data = await esClient.search(query);
	return data;
};

let getAvailabilityQuery = (platform, monthRange) => {
	let query =
                    {index: 'jiracloud',
                    type: 'prodavailability',
                        body: {
                            'size': '0',
                            'sort': [{
                                'CREATED_DATE': {
                                    'order': 'desc'
                                }
                            }],
                            'query': {
                                'match_all': {}
                            },
                            'size': 0,
                            '_source': {
                                'excludes': []
                            },
                            'aggs': {
                                'incident_month': {
                                    'terms': {
                                        'field': 'INCIDENT_MONTH.keyword',
                                        'size': 18,
                                        'include': monthRange,
                                        'order': {
                                            '_term': 'desc'
                                        }
                                    },
                                    'aggs': {
                                        'platform': {
                                            'terms': {
                                                'field': 'PLATFORM.keyword',
                                                'include': platform+'.*',
                                                'size': 10,
                                                'order': {
                                                    '_term': 'desc'
                                                }
                                            },
                                            'aggs': {
                                                'availability': {
                                                    'avg': {
                                                        'field': 'AVAILABILITY(%)'
                                                    }
                                                },
                                                'expected': {
                                                    'avg': {
                                                        'field': 'EXPECTED(%)'
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
};
module.exports = {
	getAvailabilityData
};