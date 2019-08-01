 'use strict';

    const libUtil = require('../lib/utilities/Date');
     var aivaMetrics = require('../lib/BusinessLogicLayer/AIVADigitalMetrics');
 //dummy
  let getAivaMetricsByClient = async (req, res, next) => {
    var from, to;
    from = libUtil.getLastWeekStartDate();
    to = libUtil.getLastWeekEndDate();
    try{
        let data = await aivaMetrics.getAivaFunnelMetricsByClient(from, to);
        res.status(data.status);
        res.format({
			'application/json': function() {
				res.json({clients: data.message});
			}
		});
    }catch(error) {
        next(error);
    }
  };

module.exports = {
    getAivaMetricsByClient
};


