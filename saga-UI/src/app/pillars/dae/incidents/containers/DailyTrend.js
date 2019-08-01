import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../state/actions';
import DailyTrend from '../components/DailyTrend';


const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
};

const mapStateToProps = (state, props) => {
	console.log('data in daily trend reducer is...........');
	console.log(state);
	return {
		...props,
		incidentsData: state.incidentsDaeReducer.incidentsDailyData,
		isDataAvailable: state.incidentsDaeReducer.isDailyDataAvailable,
		mapApiDataToComponentData
	};
};

let mapApiDataToComponentData = (incidentsData) => {
	let xAxisLabels = [], series = [], createdData = [], resolvedData = [];
	incidentsData.data.data.forEach(element => {
		xAxisLabels.push(element.label);
		createdData.push(element.created);
		resolvedData.push(element.resolved);
	});

	let data = {
		chartHeight : 500,
		chartTitle: incidentsData.data.product,
		chartSubtitle: incidentsData.data.trend + ' trend',
		xAxisLabels: xAxisLabels,
		yAxisTitle: 'Incidents',
		minYAxis:0,
		maxYAxis:Math.max(Math.max(...createdData),Math.max(...resolvedData))+1,
		series: [
			{
				name:'Created',
				seriesData: createdData,
				color: '#313f54'
			},
			{
				name:'Resolved',
				seriesData: resolvedData
			}
		]
	};

	console.log('data sent from daily trend container for rendering the chart is ');
	console.log(data);
	return data;
};

export default connect(mapStateToProps, mapDispatchToProps) (DailyTrend);
