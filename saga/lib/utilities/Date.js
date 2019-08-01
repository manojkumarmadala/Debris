
let getShortDateString = (date) => {
    var dd = date.getDate();
    var mm = date.getMonth()+1; //January is 0!
    var yyyy = date.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    let dateString = yyyy + '-' + mm + '-' + dd;
    return dateString;
}

let monthDiff = (d1, d2) => {
   if( typeof d1.getMonth !== 'function'){d1=new Date(d1.toString())}
   if( typeof d2.getMonth !== 'function'){d2=new Date(d2.toString())}
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
};

let addMonths = (date, months) => {
    date.setMonth(date.getMonth() + months);
    return date;
}

function getLastWeekStartDate() {
    var d = new Date();
    d.setTime(d.getTime() - (d.getDay() ? d.getDay() : 7) * 24 * 60 * 60 * 1000 - (6 * 24 * 60 * 60 * 1000));  
    return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
  }
  
  function getLastWeekEndDate() {
    var d = new Date();
    d.setTime(d.getTime() - (d.getDay() ? d.getDay() : 7) * 24 * 60 * 60 * 1000);
    return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
  }
  
  function getLastMonthStartDate() {
    var date = new Date();
    var d = new Date(date.getFullYear(), date.getMonth(), 1);
    return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
  }
  
  function getLastMonthEndDate() {
    var date = new Date(); 
    var d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
  }
  
  function getStartDateBeforeSixMonths() {
    var d = new Date();
    d.setMonth(d.getMonth()-6);
    return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
  }
let getAvailabilityMonthRange=(from, to)=> {
    if (from === undefined || to === undefined)
        return '.*';
}

module.exports = {
    getShortDateString,
    addMonths,
    monthDiff,
    getLastMonthEndDate,
    getLastWeekEndDate,
    getLastMonthStartDate,
    getLastWeekStartDate,
    getStartDateBeforeSixMonths,
    getAvailabilityMonthRange
};

