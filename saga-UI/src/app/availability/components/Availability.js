import React from 'react';
import { Row, Col } from 'reactstrap';
import Loading from '../../loading';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'; 

export default class Availability extends React.Component{
	componentDidMount(){
		if(!this.props.isAvailabilityDataAvailable){
			this.props.actions.loadAvailabilityData();
		}
    }
    
    getAvailabilityOptions = () => {
        let options = {
            chart: {
                type: 'spline',
                height:this.props.chartHeight === undefined ? 500 : this.props.chartHeight
            },
            title: {
                text: this.props.displayNames === undefined ? this.props.availabilityData.platform + ' Availability' : ''
            },
            subtitle: {
                text: this.props.displayNames === undefined ? 'Chat' : ''
            },
            xAxis: {
                categories: this.props.availabilityData.months,
                labels:{
                    rotation:0,
                    step: this.props.displayNames === undefined ? 1 : 3
                }
            },
            yAxis: {
                title: {
                    text: this.props.displayNames === undefined ? 'Availability(%)' : ''
                },
                min : 99,
                max : 100.0001
            },
            plotOptions: {
                spline: {
                    dataLabels: {
                        enabled: this.props.displayNames === undefined ? true : false
                    },
                    enableMouseTracking: true
                }
            },
            series: [{
                name: 'Availability',
                showInLegend: false,
                data: this.props.availabilityData.availability,
                marker: {
                     enabled: this.props.displayNames === undefined ? true : false
                 },
                lineWidth: 3,
                color: '#f5a623',
                shadow:true
            }],
            credits:{
                enabled:false
            }
        }
        // console.log('options of availability');
        // console.log(options);
        return options;
    }

	render(){
		if(this.props.isAvailabilityDataAvailable){
            let options = this.getAvailabilityOptions();
			return(
				<div>
                    <Loading loading={false}/>
                    <Row>
                        <Col lg={12}>
                        <HighchartsReact highcharts={Highcharts} options={options}/>
                        </Col>
                    </Row>
				</div>
			);
		}
		else
			return (
				<Loading loading={true}/>
			);
	}
}