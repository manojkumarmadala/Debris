import React from 'react';
import NormalisedVelocity from '../../agility/containers/NormalisedVelocity';
import Incidents from '../../incidents/containers/Incidents_Doughnuts';
import Revenue from '../../revenue/containers/Revenue';
import {Row, Col} from 'reactstrap';
import Availability from '../../availability/containers/Availability';
import Competition from '../../competition/containers/Competition';
//import styles from './Home.module.css';

export default function Home() {
	return (
		<div>
		
			<Row style={{'marginLeft':'30px'}}>
				<Col lg={6}>
					<Row style={{'marginBottom':'6px'}}>
						<Col style={{'backgroundColor':'white'}}lg={2}>
							<div style={{'fontSize':'16px','paddingTop':'19px'}}><b>Revenue</b></div>
							<br></br>
							<div style={{'fontSize':'30px'}}><b>$4.79</b></div>
							<div style={{'fontSize':'12px','color':'#546c90','textAlign':'center'}}><b>millions</b></div>
						</Col>
						<Col style={{'paddingLeft':'0px'}}lg={7}>
							<Revenue renderTable={false} chartHeight={188} labelSteps={1}/>
						</Col>
						<Col style={{'backgroundColor':'white'}}lg={3}>
							<div style={{'fontSize':'16px','paddingTop':'19px'}}><b>Avg Chats/hour</b></div>
							<br></br>
							<div style={{'fontSize':'30px','textAlign':'center'}}><b>94.37</b></div>
						</Col>
					</Row>
					
					<Row>
						<Col style={{'backgroundColor':'white'}}lg={2}>
							<div style={{'fontSize':'16px','paddingTop':'19px'}}><b>Availability</b></div>
							<br></br>
							<div style={{'fontSize':'30px'}}><b>100%</b></div>
							<div style={{'fontSize':'12px','color':'#7ed321','textAlign':'right'}}><b>&uarr; Target</b></div>
						</Col>
						<Col style={{'paddingLeft':'0px'}}lg={7}>
							<Availability chartHeight={194} displayNames={'None'}/>
						</Col>
						<Col style={{'backgroundColor':'white'}}lg={3}>
							<div style={{'fontSize':'16px','paddingTop':'19px'}}><b>Engaged Chats</b></div>
							<br></br>
							<div style={{'fontSize':'30px','textAlign':'center'}}><b>2.67</b></div>
							<div style={{'fontSize':'12px','color':'#546c90','textAlign':'center'}}><b>millions</b></div>
						</Col>
					</Row>
				</Col>
				<Col lg={3}>
					<Row style={{'marginBottom':'6px'}}>
						<Col lg={12}>
							<Incidents chartHeight={250} chartWidth={296} displayNames={'None'}/>
						</Col>
					</Row>
					<Row>
						<Col lg={12}>
							<NormalisedVelocity chartHeight={160} chartWidth={295} displayNames={'None'}/>
						</Col>
					</Row>
				</Col>
				<Col lg={3}>
					<Competition renderCompetitionTable={false} renderSideNav={false}/>
				</Col>
			</Row>
		</div>
	);
}