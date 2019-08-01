import React from 'react';
import Loading from '../../loading';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'; 
import Switch from "react-switch";
import {Row} from 'reactstrap';

export default class Incidents extends React.Component{
	constructor(props){
		super(props);
        this.state = {
            checked : false,
            options:[],
            isIncidentsDataAvailable: false,
            seriesData:[],
            selectedProduct:props.selectedProduct
        }
	} 

	componentDidMount(){
		//console.log(this.props);
		if (!this.props.isIncidentsDataAvailable) {
			this.props.actions.loadIncidentsData();

		}
	}

	 mapIncidentsDataToChartData = (seriesDataParam) => {
        console.log('seriesData is');
        console.log(seriesDataParam);
        let seriesData;
       
        seriesData = this.state.checked ? seriesDataParam[1] : seriesDataParam[0];
        
        
        let totalIncidents = 0;
        if(seriesData){
        seriesData.data.forEach(function(data){
            totalIncidents += data.y;
        });}

        
        let options = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: this.props.chartHeight === undefined ? 350 : this.props.chartHeight,
                width: this.props.chartWidth === undefined ? 300 : this.props.chartWidth
            },
            title: {
                text: totalIncidents.toString(),
                verticalAlign: 'middle',
            },
            subtitle: {
                text: this.props.displayNames === undefined ? 'Incidents by Status' : ''
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            plotOptions: {
                pie: {
                    center:["50%", "50%"],
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        // format: '{point.y}<br>{point.name}</br> ',
                        format:'{point.y}',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                            fontSize:'10'
                        }
                    }
                }
            },
            series: seriesData?[seriesData]:[],
            credits: {
                enabled: false
            }
        };
	 	return options;
	 };
     handleChange = () => {
        this.setState({ checked : !this.state.checked });
     }
     componentWillReceiveProps(props){
         console.log('doughnuts called');
     }
	render(){
		if (!this.props.isIncidentsDataAvailable) {
			return (
				<Loading />
			);
		}
        let seriesData = this.props.getSeriesData(this.props.incidentsData);
        
        //if series data is not available then render nothing
        if(seriesData.length === 0){
            return <div className="text-center">
                        <h4>No data available</h4>
                    </div>;
        }

		let incidentsOptions = this.mapIncidentsDataToChartData(seriesData);	 
		return(
			<div style={{'backgroundColor':'white','width':'300px'}}>
				<div style={{'fontSize':'16px','paddingLeft':'20px'}}><b>Incidents</b></div>
                <Row style={{'paddingLeft':'45%'}}>
                <Switch 
                        onChange={this.handleChange}
                        checked={this.state.checked}
                        id="normal-switch"
                        uncheckedIcon={
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                                fontSize: 15,
                                color: 'white',
                                paddingRight: 2
                              }}
                            >
                              S1
                            </div>
                          }
                          checkedIcon={
                            <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100%",
                              fontSize: 15,
                              color: 'white',
                              paddingRight: 2
                            }}
                          >
                            S2
                            </div>
                          }
                />
                        </Row>
			    <HighchartsReact highcharts={Highcharts} options={incidentsOptions}/>
			</div>
		);
	}
}