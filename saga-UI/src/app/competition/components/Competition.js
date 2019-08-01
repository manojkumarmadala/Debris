import React from 'react';
import CompetitionList from './CompetitionList.js';
import { Row, Col } from 'reactstrap';
import NewsList from './NewsList.js';
//import styles from './Competition.module.css';
import Loading from '../../loading';
import BusinessSideNav from '../../components/BusinessSideNav';

export default class Competition extends React.Component{
	constructor(props){
		super(props);
		//console.log('Competition constructor called');
        
		this.state = {
			loading:true
		};
	} 

	componentDidMount(){
		// console.log('from component did mount');
		// console.log(this.props);
		if(!this.props.isCompetitionDataAvailable || !this.props.isNewsDataAvailable){
			this.props.actions.loadCompetitionData();
			this.props.actions.loadNewsData();
		}
	}
	render(){
		let competitionModule = null;
		if(this.props.renderCompetitionTable !== false){
			competitionModule = (<Col lg={8}>
				<CompetitionList items = {this.props.competitionData.chat} title="Chatbots/VAs/AI"/>
				<CompetitionList items = {this.props.competitionData.speech} title="Speech"/>
				<CompetitionList  items = {this.props.competitionData.messaging} title="Messaging"/>
				<CompetitionList  items = {this.props.competitionData.chatPlatform} title="Chat Platform List"/>
				<CompetitionList  items = {this.props.competitionData.cja} title="CJA"/>
			</Col>);
		}
		console.log('props of competition component are .................');
		console.log(this.props)
		if(this.props.isCompetitionDataAvailable && this.props.isNewsDataAvailable){
			return(
				<div>
						<Loading loading={false}/>
						<Row style={{'backgroundColor':'white'}}>
							{competitionModule}
							<Col lg={this.props.renderCompetitionTable !== false?4:12}>
								{/* <Row className={styles.competition}>INDUSTRY DIGEST</Row> */}
								<div style={{'fontSize':'16px','paddingTop':'19px'}}><b>Industry Digest</b></div>
								<NewsList news={this.props.newsData} />
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