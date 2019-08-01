import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../state/actions';
import MonthlyTrend from '../components/MonthlyTrend';


const mapDispatchToProps = dispatch => {
	return {
		actions : bindActionCreators(actions, dispatch)
	};
};

const mapStateToProps = (state, props) => {
	return {
		...props,
		incidentsData: state.incidentsDaeReducer.incidentsMonthlyData,
		isDataAvailable: state.incidentsDaeReducer.isMonthlyDataAvailable,
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
		maxYAxis: Math.max(Math.max(...createdData), Math.max(...resolvedData)) + 2,
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

export default connect(mapStateToProps, mapDispatchToProps) (MonthlyTrend);