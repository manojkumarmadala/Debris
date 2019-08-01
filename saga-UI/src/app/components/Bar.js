import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'; 
import { NoDataToDisplay } from 'react-highcharts-no-data-to-display';

const getOptions = (data) => {
	let options = {
		chart: {
			type: 'column',
			height: data.chartHeight === undefined ? 500 : data.chartHeight
		},
		title: {
			text: data.title,
			style: {
				fontSize: data.titleFontSize
			}
		},
		xAxis: [{
			categories: data.xAxisLabels,
			crosshair: true
		}],
		yAxis: [
               
			{ // Primary yAxis
				labels: {
					format: '{value}',
					style: {
						color: Highcharts.getOptions().colors[0]
					}
				},
				title: {
					text: '',
					style: {
						color: Highcharts.getOptions().colors[0]
					}
				},
				opposite: false
    
			}],
		tooltip: {
			shared: true
		},
		plotOptions: {
			column: {
				dataLabels: {
					enabled: true
				}
			}
		},
		series: [],
		credits: {
			enabled: false
		},
		lang: {
			noData: 'No Data Available'
		},
		noData: {
			style: {
				fontWeight: 'bold',
				fontSize: '15px'
			},
			position: {
				'x': 0,
				'y': 0,
				'align': 'center',
				'verticalAlign': 'middle'
			}
		}
	};

	data.series.forEach(element => {
		options.series.push(element);
	});

	if(data.width !== undefined)
		options.chart.width = data.width;
        
	console.log('options for the bar chart is....');
	console.log(options);
	return options;    
};

export default function Bar(props) {
	// let data = {
	// 	title:'',
	// 	subtitle: '',
	// 	titleFontSize: 16,
	// 	xAxisLabels: ['jan', 'feb', 'mar', 'apr', 'may', 'june'],
	// 	series: [
	// 		{
	// 			showInLegend:false,
	// 			name: 'Created',
	// 			type: 'column',
	// 			keys:['y','color'],
	// 			data: [40, 70, 50, 30, 45, 60],
	// 			color:'#7cb5ec'
	// 		},
	// 		{
	// 			showInLegend: false,
	// 			name: 'Completed',
	// 			type: 'column',
	// 			data: [32, 56, 50, 20, 38, 25],
	// 			color: '#505A90'
	// 		}
	// 	]
	// };

	let options = getOptions(props.data);

	NoDataToDisplay(Highcharts);
	return (
		<HighchartsReact highcharts={Highcharts} options={options}/>
	);
}