import React from 'react';
import TrendGraph from '../../../../components/Trend';
import Card from '../../../../components/Card';
import Loading from '../../../../loading';
import {Row,Col,Alert,Collapse} from 'reactstrap';
import MonthlyDrilldown from '../containers/MonthlyDrilldown';
import styles from './Trend.module.css';
import { FaAngleDown,FaAngleUp } from 'react-icons/fa';




export default class DailyTrend extends React.Component{
	constructor(props){
		super(props);
        
		this.state = {
			showmore:false,
			selectedTeam: this.props.product
		};
	}

	componentDidMount(){
		 if(!this.props.isDataAvailable){
		this.props.actions.dae_loadIncidentsData(this.state.selectedTeam, 'monthly');    
		 }
	}

	toggle = ()=>{
 this.setState(prevState => ({
 	showmore: !prevState.showmore
 }));
	}

	render(){
		console.log('monthly render called with props.............');
		console.log(this.props);
		if(this.props.isDataAvailable){
			let data = this.props.mapApiDataToComponentData(this.props.incidentsData);
			let more;
			if(this.state.showmore){more=<Alert style={{'padding':'0px'}}key='info'><FaAngleUp/> Less</Alert>}
			else{more=<Alert style={{'padding':'0px'}} key='info'><FaAngleDown/> More</Alert>}
			return <div>
				<Row>
					<Col lg={10} className="text-center">
						<TrendGraph data={data}/>
					</Col>
					<Col lg={2} className="text-center">
						<Row>
							<Col lg={12}>
								<Card name="Open Tickets" value={this.props.incidentsData.data.openTickets.length} />
							</Col>
						</Row>
						<Row>
							<Col lg={12}>
								<Card name={'Total tickets in '+new Date().getFullYear()} value={this.props.incidentsData.data.total}/>
							</Col>
						</Row>
					</Col>
				</Row>
				<br></br>
				<div className={styles.more}>
					<a name="more" className={styles.link} onClick={this.toggle} >
					{more}
					</a>
				</div>
				<br></br>
				<Collapse isOpen={this.state.showmore}>
				 <MonthlyDrilldown product={this.state.selectedTeam} timeframes={data.xAxisLabels}
								key={this.state.selectedTeam}> 

							</MonthlyDrilldown> 
				</Collapse>
			</div>;
		}
            
		else    
			return <Loading loading={true}/>;
	}
}


