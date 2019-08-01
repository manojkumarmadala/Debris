import React from 'react';
import TrendGraph from '../../../../components/Trend';
import Loading from '../../../../loading';
import {Row, Col} from 'react-bootstrap';



export default class DailyTrend extends React.Component{
    
	constructor(props){
		super(props);
		this.state = {
			
			selectedTeam: this.props.product
		};
	}

	componentDidMount(){
		// if(!this.props.isDataAvailable){
		this.props.actions.dae_loadIncidentsData(this.state.selectedTeam, 'daily');    
		// }
	}
   

	render(){
		if(this.props.isDataAvailable){
			let data = this.props.mapApiDataToComponentData(this.props.incidentsData);
			return <div>
            
				<Row>
					<Col lg={12} className="text-center">
						<TrendGraph data={data}/>
					</Col>
				</Row>
			</div>;
		}
            
		else    
			return <Loading loading={true}/>;
	}
}