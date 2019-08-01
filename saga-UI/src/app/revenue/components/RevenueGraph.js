import React,{Component} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class RevenueGraph extends Component{
	render(){
		let properties = getProperties(this.props.values.hits.hits);
		let options = {
			chart: {
        		height: this.props.chartHeight===undefined? 500: this.props.chartHeight,
				type: 'spline'
			},
			title: {
				text: '',
				align: 'left'
			},
			xAxis: {
				//categories:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
				categories: properties.categories,
				labels: {
					rotation: 0,
					step: this.props.labelSteps === undefined ? 1: this.props.labelSteps
				}
				
			},
			yAxis: {
				title: {
					text: ''
				}
			},
			plotOptions: {
				line: {
					dataLabels: {
						enabled: true
					},
					enableMouseTracking: false
				}
			},
				
			series: [{
				showInLegend: false,
				//data: [40, 50, 25, 75, 55, 60, 52, 55, 55, 55, 27, 27],
				data:properties.data,
				lineWidth: 3,
				color: '#f5a623',
				marker: {
					enabled: false
				},
				shadow: true
			}],
				
			credits: {
				enabled: false
			}
		};

		return(
			<div>
				<HighchartsReact highcharts={Highcharts} options={options}/>
			</div>
		);
	}
}	
	

function getProperties(data){
	
	let dataValue=[];
	let categories=[];
	data.forEach(element => {
		dataValue.push(element._source.TotalRevenue);
		let month = element._source.Month.substring(0,3);
		month = month.charAt(0).toUpperCase() + month.slice(1);
		categories.push(month);
	});
	
	return {'data':dataValue,'categories':categories};
}

/*function seriesObject(name,data){
	this.name=name;
	this.data=data;
}*/


export default RevenueGraph;
