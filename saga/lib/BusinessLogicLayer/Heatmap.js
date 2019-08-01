var {
    getHeatmapData
} = require('../DataAccessLayer/Heatmap');


class dataentry {
    constructor(client, month, month_db, count) {
         this.client = client;
         this.month = month;
         this.month_db = month_db;
         this.count = count;
    }
};
let getHeatmap = async (product) => {
    let result = await getHeatmapData(product);
    let response = new Array();
    var month_name = ["-A-January", "-B-February", "-C-March", "-D-April", "-E-May", "-F-June", "-G-July", "-H-August", "-I-September", "-J-October", "-K-November", "-L-December"]
    var map = {};
    var month_replica = {}
    var month_map = {};
    for (var k = new Date().getMonth() - 5; k <= new Date().getMonth(); k++) {
        if (k < 0) {
            month_replica[(new Date().getFullYear() - 1) + month_name[k + 12]] = 0;
        } else {
            month_replica[(new Date().getFullYear()) + month_name[k]] = 0;
        }


    }
    
    
    
    for (var i = 0; i < result.aggregations.client.buckets.length; i++) {
        var client_count = 0;
        for (var j = 0; j < result.aggregations.client.buckets[i].month.buckets.length; j++) {

            month_replica[result.aggregations.client.buckets[i].month.buckets[j].key] = result.aggregations.client.buckets[i].month.buckets[j].doc_count;
            


        }
        

        Object.keys(month_replica).forEach(function (key) {
            value = month_replica[key];
            response.push(new dataentry(result.aggregations.client.buckets[i].key, key.split("-")[2], key, value));
            month_replica[key] = 0;
            client_count += value;
        });


        response.push(new dataentry(result.aggregations.client.buckets[i].key, "Total", "Total", client_count));

        
    }


    for (var k = 0; k < response.length; k++) {
        
        if (map[response[k].month] == null) {
            map[response[k].month] = response[k].count;
            month_map[response[k].month] = response[k].month_db;
        } else {
            map[response[k].month] += response[k].count;
        }
    }
    var value;

    Object.keys(map).forEach(function (key) {
        value = map[key];
        response.push(new dataentry("Total", key, month_map[key], value));
        
    });
    return response


};

module.exports = {
    getHeatmap
};