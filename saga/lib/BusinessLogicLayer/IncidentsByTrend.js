var {
    getIncidentsByTrendData
} = require('../DataAccessLayer/IncidentsByTrend');

class dataObject{
     constructor(label, created, resolved) {
         this.label = label;
         this.created = created;
         this.resolved = resolved;
     }
 };


let getIncidentsByTrend = async (product, trend) => {
    let response = await getIncidentsByTrendData(product, trend);
    let result;
    if (trend == "daily") {
        result = generateDailyData(response, product);
    }
    if (trend == "weekly") {
        result = generateWeeklyData(response, product);
    }
    if (trend == "monthly") {
        result = generateMonthlyData(response, product);
    }
    return result;
};

let generateDailyData = (response, product) => {
     var data = new Array();
    let currentMonth=new Date().getMonth()+1;
    for (var i = 0; i < response.responses[0].aggregations.created.buckets.length; i++) {
    var month = response.responses[0].aggregations.created.buckets[i].key_as_string.split("T")[0].split("-")[1];
    if (month == currentMonth) {
        var day = response.responses[0].aggregations.created.buckets[i].key_as_string.split("T")[0];
        var created = response.responses[0].aggregations.created.buckets[i].doc_count;
        var resolved;
        var item = response.responses[1].aggregations.resolved.buckets[i];
        if (item != null && (item.key_as_string.split("T")[0] == response.responses[0].aggregations.created.buckets[i].key_as_string.split("T")[0]))
             resolved = item.doc_count
        else resolved = 0;
    }
      data.push(new dataObject(day, created, resolved));

}

  return {"product":product[0],"trend":"daily","data":data}
}
let generateWeeklyData = (response, product) => {
    var data = new Array();
     var weekCreated = getWeeksHistory(response.responses[0].aggregations.created.buckets);
     var weekResolved = getWeeksHistory(response.responses[1].aggregations.resolved.buckets);
    for (var i = 0; i < response.responses[0].aggregations.created.buckets.length; i++) {
     var month = response.responses[0].aggregations.created.buckets[i].key_as_string.split("T")[0].split("-")[1];
   
     var week = response.responses[0].aggregations.created.buckets[i].key_as_string.split("T")[0];
     var created = response.responses[0].aggregations.created.buckets[i].doc_count;
     var resolved;
     var item = response.responses[1].aggregations.resolved.buckets[i];
     if (item != null && (item.key_as_string.split("T")[0] == response.responses[0].aggregations.created.buckets[i].key_as_string.split("T")[0]))
     resolved = item.doc_count
     else resolved = 0;
     data.push(new dataObject(week, created, resolved));

}
console.log(weekCreated);
console.log(weekResolved);


  return {"product":product[0],"trend":"weekly","data":data,"weekCreated":weekCreated,"weekResolved":weekResolved}
}
let generateMonthlyData = (response,product) => {
    
    var data=new Array();
    var totalThisyear=0;
    var monthStart = Math.max(0, response.responses[0].aggregations.created.buckets.length - 12);

     for (var i = monthStart; i < response.responses[0].aggregations.created.buckets.length; i++) {
        var month = response.responses[0].aggregations.created.buckets[i].key.split("-");
        var created = response.responses[0].aggregations.created.buckets[i].doc_count;
        var resolved;
        var item = response.responses[0].aggregations.resolved.buckets[i];
        if (item != null && (item.key == response.responses[0].aggregations.created.buckets[i].key))
            resolved=item.doc_count
        else resolved=0;

        if(month[0]==new Date().getFullYear()){totalThisyear+=created;}
        data.push(new dataObject(month[2] + "-" + month[0].substr(2), created, resolved));

    }
    return {"product":product[0],"trend":"monthly","data":data,"openTickets":response.responses[1].hits.hits,"total":totalThisyear}
}

let getWeeksHistory = (weeklyData)=>{
    
    var currentWeekIndex = weeklyData.length - 1;
    var lastWeekIndex = weeklyData.length - 2;
    if (weeklyData.length - 1 >= 0) {
        var currentDate = new Date();
        
        var lastDateResponse = weeklyData[weeklyData.length - 1].key_as_string.split("T")[0];
        var lastDateKnown = new Date(lastDateResponse);
        var differenceDates = Math.round(Math.abs((currentDate.getTime() - lastDateKnown.getTime()) / (24 * 60 * 60 * 1000)));
        if (differenceDates >= 7 && differenceDates <= 14) {
            currentWeekIndex = weeklyData.length;

            var lastweekcreated = weeklyData.length - 1 >= 0 ? weeklyData[weeklyData.length - 1].doc_count : 0;
           
           return {"current":0,"previous":lastweekcreated};
            
        } else if (differenceDates <= 7) {
            currentWeekIndex = weeklyData.length - 1;
            lastWeekIndex = weeklyData.length - 2;
            var currentweekcreated = weeklyData.length - 1 >= 0 ? weeklyData[weeklyData.length - 1].doc_count : 0;
            var lastweekcreated = weeklyData.length - 2 >= 0 ? weeklyData[weeklyData.length - 2].doc_count : 0;

            return {
                "current": currentweekcreated, "previous": lastweekcreated
            };
           
        } else {
            return {"current":0,"previous":0};
        }
    } else {
        return {"current":0,"previous":0};
    }
}
module.exports = {
    getIncidentsByTrend
};