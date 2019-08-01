import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../state/actions';
import MonthlyDrilldown from '../components/MonthlyDrilldown';
import daeData from '../../dae-data.json';


const mapDispatchToProps = dispatch => {
	return {
		actions : bindActionCreators(actions, dispatch)
	};
};

const mapStateToProps = (state, props) => {
	return {
		...props,
		incidentsData: state.incidentsDaeDrilldownReducer.incidentsMonthlyData,
		isDataAvailable: state.incidentsDaeDrilldownReducer.isMonthlyDataAvailable,
		categories: daeData.categories,
		mapApiDataToComponentData,
		getTimeframe
	};
};

let mapApiDataToComponentData = (incidentsData,category) => {
	let xAxisLabels = [], series = [], data = [];
	
	incidentsData.data.categories.forEach(item=>{
		if(item.type===category && category !=='RCA'){ 
			if (item.data != 'Empty Bucket') {
				item.data.forEach(element => {
					xAxisLabels.push(element.key);
					data.push(element.doc_count);
			
				});}
		}
		if (item.type === category && category==='RCA') {
			console.log(item);
			xAxisLabels=item.data.labels;
			if (item.data != 'Empty Bucket'){
				for(var i=0;i<item.data.seriesname.length;i++){
					series.push({name:item.data.seriesname[i],data:item.data.seriesvalue[i]});
				}
			}
		}
       
	});
	
    

	let seriesdataBar = {
		chartHeight : 500,
		title: 'By '+category,
		xAxisLabels: xAxisLabels,
		yAxisTitle: 'Incidents',
		minYAxis:0,
		maxYAxis: Math.max(Math.max(...data)) + 2,
		series: [
			{
				showInLegend: false,
				name: 'Created',
				type: 'column',
				keys: ['y', 'color'],
				data: data,
				color: '#7cb5ec'
			}
		]
	};
	let seriesdataArea = {
		chartHeight: 500,
		title: 'By '+category,
		xAxisLabels: xAxisLabels,
		yAxisTitle: 'Incidents',
		pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>incidents in {point.x}',
		minYAxis: 0,
		maxYAxis: Math.max(Math.max(...data)) + 2,
		series: series
	};

	console.log('data sent from daily trend container for rendering the chart is ');
	console.log(seriesdataBar);
	console.log(seriesdataArea);
	if(category==='RCA')return seriesdataArea;
	else return seriesdataBar;
};
let getTimeframe=(timeframe)=>{
	let monthName=timeframe.split('-')[0];
	let year='20'+timeframe.split('-')[1];
	if(monthName==='January'){return year+'-01-01T'+year+'-01-31';}
	if(monthName==='February'){if(parseInt(year)%4==0) return year+'-02-01T'+year+'-02-29';
	else return year+'-02-01T'+year+'-02-28';}
	if(monthName==='March'){return year+'-03-01T'+year+'-03-31';}
	if(monthName==='April'){return year+'-04-01T'+year+'-04-30';}
	if(monthName==='May'){return year+'-05-01T'+year+'-05-31';}
	if(monthName==='June'){return year+'-06-01T'+year+'-06-30';}
	if(monthName==='July'){return year+'-07-01T'+year+'-07-31';}
	if(monthName==='August'){return year+'-08-01T'+year+'-08-31';}
	if(monthName==='September'){return year+'-09-01T'+year+'-09-30';}
	if(monthName==='October'){return year+'-10-01T'+year+'-10-31';}
	if(monthName==='November'){return year+'-11-01T'+year+'-11-30';}
	if(monthName==='December'){return year+'-12-01T'+year+'-12-31';}
};
export default connect(mapStateToProps, mapDispatchToProps)(MonthlyDrilldown);