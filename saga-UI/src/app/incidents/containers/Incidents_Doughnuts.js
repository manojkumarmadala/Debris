import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../state/actions';
import Incidents_Doughnut from '../components/Incidents_Doughnut';

let getSeriesData = (incidentsData)=>{
    let statusData = [];
    for(let i=0;i<incidentsData.severity.length;i++){
        var item = incidentsData.severity[i];
        let statusMap = {};    
    
        item.status.forEach(function(incidentStatus){
            Object.keys(incidentStatus).forEach(function(key){
                if(statusMap[key] === undefined){
                    statusMap[key] = incidentStatus[key];
                }
                else{
                    statusMap[key] += incidentStatus[key];
                }
            });
        });

        let dataArr = [];
        Object.keys(statusMap).forEach(function(key){
            let data = {
                name:key,
                y:statusMap[key]
            };
            dataArr.push(data);
        })  
        statusData.push({name:item.title, data: dataArr, innerSize: '70%' });
    }
    
    return statusData;
}

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
};

const mapStateToProps = (state, props) => {
	return {
	
		isIncidentsDataAvailable: state.incidentsReducer.isIncidentsDataAvailable,
        incidentsData: state.incidentsReducer.incidentsData.data,
        getSeriesData,
        chartHeight:props.chartHeight,
        chartWidth:props.chartWidth
	};
};

export default connect(mapStateToProps, mapDispatchToProps) (Incidents_Doughnut);