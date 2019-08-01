import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../../state/actions';
import WeeklyDrilldown from '../components/WeeklyDrilldown';
import daeData from '../../dae-data.json';


const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
};

const mapStateToProps = (state, props) => {
	return {
		...props,
		incidentsData: state.incidentsDaeDrilldownReducer.incidentsWeeklyData,
		isDataAvailable: state.incidentsDaeDrilldownReducer.isWeeklyDataAvailable,
		categories: daeData.categories,
		mapApiDataToComponentData,
		getTimeframe
	};
};

let mapApiDataToComponentData = (incidentsData, category) => {
	let xAxisLabels = [],
		series = [],
		data = [];

	incidentsData.data.categories.forEach(item => {
		if (item.type === category ) {
			if (item.data != 'Empty Bucket') {
				item.data.forEach(element => {
					xAxisLabels.push(element.key);
					data.push(element.doc_count);

				});
			}
		}

	});



	let seriesdataBar = {
		chartHeight: 500,
		title: 'By ' + category,
		xAxisLabels: xAxisLabels,
		yAxisTitle: 'Incidents',
		minYAxis: 0,
		maxYAxis: Math.max(Math.max(...data)) + 2,
		series: [{
			showInLegend: false,
			name: 'Created',
			type: 'column',
			keys: ['y', 'color'],
			data: data,
			color: '#7cb5ec'
		}]
	};
	return seriesdataBar;
};
let getTimeframe = (timeframe) => {
	let startDate=new Date(timeframe);
	let endDate = new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000);

	return timeframe+'T'+endDate.getFullYear()+'-'+(endDate.getMonth()+1)+'-'+endDate.getDate();
	
};
export default connect(mapStateToProps, mapDispatchToProps)(WeeklyDrilldown);