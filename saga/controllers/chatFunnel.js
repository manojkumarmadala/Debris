
'use strict';

const libUtil = require('../lib/utilities/Date');
var chat = require('../lib/BusinessLogicLayer/ChatMetrics');

  let getChatFunnelMetrics = async (req, res, next) => {                  
      try {
          let response = await chat.getAllFunnelMetrics();
          res.status(response.status);
		res.format({
			'application/json': function () {
				res.json(response.message);
			}
		});
      }catch(error) {
        next(error);
    }               
  };

  let getChatMetricsByClient = async (req, res, next) => {    
    var from, to;
    from = libUtil.getLastWeekStartDate();
    to = libUtil.getLastWeekEndDate(); 
    try{ 
    let response = await chat.getMetricsByClient(from, to);
    res.status(response.status);
		res.format({
			'application/json': function () {
				res.json({clients: response.message});
			}
        });    
    } catch(error) {
        next(error);
    }  
  }

  let getChatMetricsByFilter = async (req, res, next) => {
    const params = req.swagger.params;
    const filterId = params.filterId.value;
    var from, to;
    console.log("FilterId: " + filterId);
    if(filterId == 'lastWeek'){
        from = libUtil.getLastWeekStartDate();
        to = libUtil.getLastWeekEndDate();    
        console.log("from: "+from+"  to: "+to);    
    }
    else if (filterId == 'lastMonth'){       
        from = libUtil.getLastMonthStartDate();
        to = libUtil.getLastMonthEndDate();
        console.log("from: "+from+"  to: "+to);
    }
    else if (filterId == 'lastSixMonths') {
        var d = new Date();        
        from = libUtil.getStartDateBeforeSixMonths();
        to = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
        console.log("from: "+from+"  to: "+to);
    }  
    try{ 
    let response = await chat.getMetricsByFilter(from, to);
    res.status(response.status);
		res.format({
			'application/json': function () {
				res.json(response.message);
			}
        });  
    }catch(error) {
        next(error);
    }
  }

  module.exports = {
    getChatFunnelMetrics,
    getChatMetricsByClient,
    getChatMetricsByFilter
  };
