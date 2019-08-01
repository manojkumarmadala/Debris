'use strict';

var { getHeatmap } = require('../lib/BusinessLogicLayer/Heatmap');

let getHeatmapData = async (req, res, next) => {
	
	
	try{
        let product ;
        if (req.query.product === undefined) product = ['24/7 Chat'];
        else
        {
        product =Array.isArray(req.query.product) ? req.query.product : req.query.product.split(',');
        }
        
		let data = await getHeatmap( product);
		res.status(200);
		res.format({
			'application/json': function() {
				res.json(data);
			}
		});
	}
	catch(error){
		next(error);
	}
};

module.exports ={
	getHeatmapData
};