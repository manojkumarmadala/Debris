var revenueData = require('../DataAccessLayer/Revenue');
var Promise = require('promise');

module.exports={
	getBody:function(values){
		var client=function(name,revenue){
			this.name=name;
			this.revenue=revenue;
		};
		var product=function(name, clients){
			this.name=name,
			this.clients=clients;

		};
		var YearAndMonth=getYearAndMonth(Object.keys(values[0])[2]);
		var products=new Array();
		var revenueByClient={};
		var revenueByClients = new Array();
		var totalRevenue;
		var productMap={};
		values.forEach(element => {
			var productName = element[Object.keys(element)[0]];
			var clientName = element[Object.keys(element)[1]];
			var revenueAmount = parseInt(element[Object.keys(element)[2]].replace(/[,]/g, ''));
        
			if (productMap[productName] == null && productName!='Total') {
				var clientArray=new Array();
				clientArray.push(new client(clientName, revenueAmount));
				productMap[productName] = clientArray;
				products.push(new product(productName, productMap[productName]));
			}
			else if (productName == 'Total') {
				totalRevenue = revenueAmount;
			}
			else{
				productMap[productName].push(new client(clientName, revenueAmount));
               
			}

		});
        
		values.forEach(element => {
			var clientName = element[Object.keys(element)[1]];
			var revenue = parseInt(element[Object.keys(element)[2]].replace(/[,]/g,''));
			if(clientName.length>0){
				if (revenueByClient[clientName] == null ) {
					revenueByClient[clientName] = revenue;
				} else {
					revenueByClient[clientName] += revenue;
				}
			}
		});
        
		Object.keys(revenueByClient).forEach(function (key) {
			revenueByClients.push(new client(key,revenueByClient[key]));
            
		});
		
		var query={'index':'revenue','type':'revenue','id':''+YearAndMonth.Month+YearAndMonth.Year,'body':{

			'Month':YearAndMonth.Month,
			'MonthID': YearAndMonth.MonthID,
			'Year':YearAndMonth.Year,
			'TotalRevenue':totalRevenue,
			'Product':products,
			'revenueByClient': revenueByClients
		}};

		
		var promise = revenueData.postRevenueData(query);

		return promise;
		

    
    
	}

};

var getYearAndMonth=function(id){
	var year=parseInt('20'+id.split('-')[0]);
	var monthMap={};
	monthMap['Jan']='A-january';
	monthMap['Feb'] = 'B-february';
	monthMap['Mar'] = 'C-march';
	monthMap['Apr'] = 'D-april';
	monthMap['May'] = 'E-may';
	monthMap['Jun'] = 'F-june';
	monthMap['Jul'] = 'G-july';
	monthMap['Aug'] = 'H-august';
	monthMap['Sep'] = 'I-september';
	monthMap['Oct'] = 'J-october';
	monthMap['Nov'] = 'K-november';
	monthMap['Dec'] = 'L-december';
    
	return ({
		'Month': monthMap[id.split('-')[1]].split('-')[1], 'MonthID': monthMap[id.split('-')[1]], 'Year': year
	});
};