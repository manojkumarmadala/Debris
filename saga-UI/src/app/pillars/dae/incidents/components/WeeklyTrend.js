import React from 'react';
import TrendGraph from '../../../../components/Trend';
import Card from '../../../../components/Card';
import Loading from '../../../../loading';
import {Row, Col, Alert,Collapse} from 'reactstrap';
import WeeklyDrilldown from '../containers/WeeklyDrilldown';
import styles from './Trend.module.css';
import { FaAngleDown,FaAngleUp } from 'react-icons/fa';



export default class WeeklyTrend extends React.Component{
	constructor(props){
		super(props);
        
		this.state = {
			showmore: false,
			selectedTeam: this.props.product
		};
	}

	componentDidMount(){
		//    if(!this.props.isDataAvailable){
		this.props.actions.dae_loadIncidentsData(this.state.selectedTeam, 'weekly');    
		//  }
	}

		toggle = () => {
			this.setState(prevState => ({
				showmore: !prevState.showmore
			}));
		}
   

	render(){
        
		if(this.props.isDataAvailable){
			let data = this.props.mapApiDataToComponentData(this.props.incidentsData);
			let more;
			if(this.state.showmore){more=<Alert style={{'padding':'0px'}}key='info'><FaAngleUp/> Less</Alert>}
			else{more=<Alert style={{'padding':'0px'}}key='info'><FaAngleDown/> More</Alert>}
			return <div>
				
				<Row>
					<Col lg={10} className="text-center">
						<TrendGraph data={data}/>
					</Col>
					<Col lg={2} className="text-center">
						<Row>
							<Col lg={12}>
								<Card name="Current Week New" value={this.props.incidentsData.data.weekCreated.current} />
							</Col>
						</Row>
						<Row>
							<Col lg={12}>
								<Card name="Current Week Closed" value={this.props.incidentsData.data.weekResolved.current}/>
							</Col>
						</Row>
						<Row>
							<Col lg={12}>
								<Card name="Last Week New" value={this.props.incidentsData.data.weekCreated.previous} />
							</Col>
						</Row>
						<Row>
							<Col lg={12}>
								<Card name="Last Week Closed" value={this.props.incidentsData.data.weekResolved.previous}/>
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
					<WeeklyDrilldown product={this.state.selectedTeam} timeframes={data.xAxisLabels}
						key={this.state.selectedTeam}> 
					</WeeklyDrilldown>
				</Collapse>
			</div>;
		}
            
		else    
			return <Loading loading={true}/>;
	}
}

function DrilldownComponent(props) {
	if(props.display){
		return ;
	}
	else {
		return <div></div>;
	}
  
}