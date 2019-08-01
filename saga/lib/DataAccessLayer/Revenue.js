var client = require('../elasticsearch/elasticsearch-client');
var Promise = require('promise');

module.exports={
	getRevenueData: function(Month,Year){
		return new Promise(function(resolve,reject){
			
			client.search(getRevenueQuery(Month, Year)).then(function (response) {

				resolve(response);

			},
			function (error) {
				reject(error.message);
			});
		});

	}
	
	,
	postRevenueData:function(query){
		return new Promise(function(resolve,reject){

			client.create(query).then(function (response) {
				
				resolve(response);
			},
			function (error) {
				reject(error.message);
			});
		});
	}
};

var getRevenueQuery= function (Month,Year) {
	var must = new Array();
	Month =Month!=null? Month.replace(/[,]/g, ' '):'none';
	Year = Year!=null?Year.replace(/[,]/g, ' '):'none';
	if (Month.split(' ').length > 1) must.push({
		'match': {
			'Month': {
				'query': Month,
				'operator': 'or'
			}
		}
	});
	if (Month.split(' ').length == 1 && Month!='none') must.push({
		'match': {
			'Month': Month
		}
	});
	if (Year.split(' ').length > 1) must.push({
		'match': {
			'Year': {
				'query': Year,
				'operator': 'or'
			}
		}
	});
	if (Year.split(' ').length == 1 && Year!='none') must.push({
		'match': {
			'Year': Year
		}
	});
	
	
	

	return ({
		index: 'revenue',
		type: 'revenue',
		
		body: {
			'size': 100,
			'sort': [{
				'MonthID': {
					'order': 'asc',
				}
			}],
			'query': {
				'bool': {
					'must': must
				}
			}
		}
	});

};