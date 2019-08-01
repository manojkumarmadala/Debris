var {getBoardsByPillar} = require('../DataAccessLayer/PersonWeeks');
var {postPersonWeeks} = require('../DataAccessLayer/PersonWeeks');

let getBoardsByPillarResponse = async (pillar) => {

    let data = await getBoardsByPillar(pillar);
    let response={};
    if(data.aggregations.boards.buckets.length>0){
        let boards = [];
        let sprints = [];
        let velocity=[];
        data.aggregations.boards.buckets.forEach(element => {
            boards.push(element.key);
            sprints.push(getSprints(element));
            velocity.push(getVelocity(element));
            });
    response={pillar:pillar,boards:boards,sprints:sprints,velocity:velocity};
    }

 return response; 
};

let getSprints=(item)=>{
    let sprints=[];
    if(item.sprints.buckets.length>0){
    item.sprints.buckets.forEach(element=>{
        sprints.push(element.key);
    });
    }
return sprints;
}

let getVelocity=(item)=>{
    let velocity=[];
    if (item.sprints.buckets.length > 0){
      item.sprints.buckets.forEach(element => {
          velocity.push(element.velocity.buckets[0].key);
      });
    }
    return velocity;
}

let postPersonWeeksResponse=async(personWeeks,normalisedVelocity,sprintName)=>{

    let data = await postPersonWeeks(personWeeks,normalisedVelocity,sprintName);

    return data;
}

module.exports = {
    getBoardsByPillarResponse,
    postPersonWeeksResponse
};