import React from 'react';
import Loading from '../../loading';
import { Row, Col,Collapse} from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'; 
import IncidentsDoughnuts from '../containers/Incidents_Doughnuts';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,ButtonGroup ,Button } from 'reactstrap';
import styles from './Incidents.module.css';
import {FaFilter } from 'react-icons/fa';
import {IconContext} from "react-icons";
import DatePicker from "react-datepicker"; 
import { element } from 'prop-types';

export default class Incidents extends React.Component{
	constructor(props){
		super(props);
		console.log('props in Incidents are');
		console.log(props);
		this.chartComponent = React.createRef();
		this.state = {
			dropdownOpen: false,
			showFilters:false,
			startMonth: new Date(new Date().setMonth(new Date().getMonth() - 6)),
			endMonth: new Date(),
			selectedProduct:props.selectedProduct,
			severity:[1,2],
			reportedBy:['Client','Internal'],
			environment:['Production']
				};
	
	}

	componentDidMount(){
		console.log('incidents components loaded. props are');
		console.log(this.props);
		
		if (!this.props.isIncidentsDataAvailable) {
			this.props.actions.loadIncidentsData(this.props.selectedProduct);
	}

	}

	getSeriesData = ()=>{
		
		var seriesData=[]
		var colors = ['#e97c1e', '#505A90', '#7cb5ec']

		for(let i=0;i<this.props.incidentsData.data.severity.length;i++){
			var item = this.props.incidentsData.data.severity
			seriesData.push({
				showInLegend: true,
				name: item[i].title,
				data: item[i].data,
				color: colors[i]
			});
		}
		return seriesData;
	}
	 mapIncidentsDataToChartData = (incidentsData) => {
	 	
	 	let options = {
	 		chart: {
				 type: 'column'
	 		},
	 		title: {
	 			text: incidentsData.product,
	 			style: {
	 				fontSize: '15px'
	 			}
	 		},
	 		xAxis: [{
	 			categories: incidentsData.IncidentMonths,
				 crosshair: true,
				 title: {
				 	text: 'Incident Month',
				 	style: {
				 		color: Highcharts.getOptions().colors[3]
				 	}
				 }
	 		}],
	 		yAxis: [
	 			{ // Primary yAxis
	 				labels: {
	 					format: '{value}',
	 					style: {
	 						color: Highcharts.getOptions().colors[2]
	 					}
	 				},
	 				title: {
	 					text: 'Incidents',
	 					style: {
	 						color: Highcharts.getOptions().colors[2]
	 					}
	 				},
	 				opposite: false

	 			}
	 		],
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
	 		series:this.getSeriesData(),
	 		credits: {
	 			enabled: false
	 		}
	 	};
	 	return options;
	 };

	 toggle = () => {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
	}
	
	onSeverityClick(selected) {
    const index = this.state.severity.indexOf(selected);
    if (index < 0) {
      this.state.severity.push(selected);
    } else {
      this.state.severity.splice(index, 1);
    }
    this.setState({ severity: [...this.state.severity] });
  }
  onReportedByClick(selected){
	   const index = this.state.reportedBy.indexOf(selected);
    if (index < 0) {
      this.state.reportedBy.push(selected);
    } else {
      this.state.reportedBy.splice(index, 1);
    }
    this.setState({ reportedBy: [...this.state.reportedBy] });
  }
  onEnvironmentClick(selected) {
 const index = this.state.environment.indexOf(selected);
    if (index < 0) {
      this.state.environment.push(selected);
    } else {
      this.state.environment.splice(index, 1);
    }
    this.setState({ environment: [...this.state.environment] });
	}
	handleStartChange = (date)=>{
	 	this.setState({
	 		startMonth: date
		 });
		 console.log(date);
	 }
	handleEndChange = (date)=>{
	 	this.setState({
	 		endMonth: date
	 	});
	 }
	toggleFilters = () => {
		this.setState(prevState => ({
			showFilters: !prevState.showFilters
		}));

		console.log(this.state.showFilters);
	}

    changeProduct = (product) => {
      if (this.state.selectedProduct !== product) {
				let from=this.state.startMonth;
				from = from.getFullYear() + '-' + (from.getMonth() < 9 ? ('0' + (from.getMonth() + 1)) : (from.getMonth() + 1)) + '-01';
				let to = this.state.endMonth;
				to = to.getFullYear() + '-' +(to.getMonth() < 9 ? ('0' + (to.getMonth() + 2)%12) : (to.getMonth() + 2)%12) + '-01' ;
				let severity='S['+this.state.severity.join('')+']';
				this.props.actions.invalidateIncidentsData();
				this.props.actions.loadIncidentsData(product, severity, this.state.reportedBy, from, to, this.state.environment);
		}
        this.setState({
            ...this.state,
            selectedProduct:product
        });
        
		}
		applyFilters=()=>{

			let from=this.state.startMonth;
			from = from.getFullYear() + '-' + (from.getMonth() < 9 ? ('0' + (from.getMonth() + 1)) : (from.getMonth() + 1)) + '-01';
			let to = this.state.endMonth;
			to = to.getFullYear() + '-' +(to.getMonth() < 9 ? ('0' + (to.getMonth() + 2)%12) : (to.getMonth() + 2)%12) + '-01' ;
			let severity='S['+this.state.severity.join('')+']';
			console.log('Applying Filter');
			this.props.actions.invalidateIncidentsData();
			this.props.actions.loadIncidentsData(this.state.selectedProduct, severity, this.state.reportedBy, from, to, this.state.environment);
			
			
		}


	render(){

		if (!this.props.isIncidentsDataAvailable) {
			return (
				<Loading loading={true}/>
			);
		}
		else{
			 let incidentsOptions = this.mapIncidentsDataToChartData(this.props.incidentsData.data);
			return(
				<div className={"sideNavAvailable"} >
                    <Loading loading={false}/>
					<Row className="text-center">
					<Dropdown className={styles.teamDropDownButton} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                                {this.state.selectedProduct}
                            </DropdownToggle>
                            <DropdownMenu>
                            <DropdownItem header>Products</DropdownItem>
                            {this.props.products.map(product => {
                                return (<DropdownItem key={product} onClick={() => this.changeProduct(product)}>{product}</DropdownItem>);
                            })}
                            </DropdownMenu>
                        </Dropdown>
						<IconContext.Provider value={{ color: "#313F54", size: "1.2em" }}>
						<div>
							<FaFilter style={{'cursor':'pointer'}}onClick={this.toggleFilters}/>
						</div>
						</IconContext.Provider>
						
					</Row>
					<Row>
					<Collapse isOpen={this.state.showFilters}>
					<div className={styles.filterDiv} >
					<h5>Filters</h5>
					<span><b>Severity</b></span>
					<ButtonGroup className={styles.buttonGroup}>
						<Button color="primary" onClick={() => this.onSeverityClick(1)} className={this.state.severity.includes(1)?styles.active:styles.inactive}>S1</Button>
						<Button color="primary" onClick={() => this.onSeverityClick(2)} className={this.state.severity.includes(2)?styles.active:styles.inactive}>S2</Button>
						<Button color="primary" onClick={() => this.onSeverityClick(3)} className={this.state.severity.includes(3)?styles.active:styles.inactive}>S3</Button>
					</ButtonGroup>
					<span><b>ReportedBy</b></span>
					<ButtonGroup className={styles.buttonGroup}>
						<Button color="primary" onClick={() => this.onReportedByClick('Client')} className={this.state.reportedBy.includes('Client')?styles.active:styles.inactive}>Client</Button>
						<Button color="primary" onClick={() => this.onReportedByClick('Internal')} className={this.state.reportedBy.includes('Internal')?styles.active:styles.inactive}>Internal</Button>
						<Button color="primary" onClick={() => this.onReportedByClick('Monitors')} className={this.state.reportedBy.includes('Monitors')?styles.active:styles.inactive}>Monitors</Button>
					</ButtonGroup>
					<span><b>Environment</b></span>
					<ButtonGroup className={styles.buttonGroup}>
						<Button color="primary" onClick={() => this.onEnvironmentClick('Production')} className={this.state.environment.includes('Production')?styles.active:styles.inactive}>Production</Button>
						<Button color="primary" onClick={() => this.onEnvironmentClick('Staging')} className={this.state.environment.includes('Staging')?styles.active:styles.inactive}>Staging</Button>
					</ButtonGroup>
					<span><b>Range</b></span>
					<DatePicker className={styles.datePicker}
						placeholderText = "From"
						selected={this.state.startMonth}
						onChange={this.handleStartChange}
						dateFormat="MM/yyyy"
						showMonthYearPicker
					/>
					<DatePicker className={styles.datePicker}
						placeholderText = "To"
						selected={this.state.endMonth}
						onChange={this.handleEndChange}
						dateFormat="MM/yyyy"
						showMonthYearPicker
					/>

					 <Button color="#313F54" className={styles.button} onClick={this.applyFilters} >Apply</Button>

					</div>
					</Collapse>
					</Row>
                    <Row>
                        <Col lg={6}>
                            <HighchartsReact highcharts={Highcharts} options={incidentsOptions} ref={this.chartComponent}/>
                        </Col>
                        <Col lg={3}>
                            <IncidentsDoughnuts selectedProduct={this.state.selectedProduct}/>
                        </Col>
                    </Row>
				</div>
			);
		}
	}
}

