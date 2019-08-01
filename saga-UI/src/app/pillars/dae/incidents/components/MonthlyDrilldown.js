import React from 'react';
import Bar from '../../../../components/Bar';
import Area from '../../../../components/Area';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import styles from './Trend.module.css';
import Card from '../../../../components/Card';
import Loading from '../../../../loading';
import {Row, Col} from 'react-bootstrap';




export default class MonthlyDrilldown extends React.Component{
	constructor(props){
		super(props);
        
		this.state = {
			isSelectDropdownOpen:false,
			isCategoryDropdownOpen:false,
			selectedMonth: this.props.timeframes[this.props.timeframes.length - 1],
			selectedCategory: this.props.categories[3]
		};
	}

	componentDidMount(){
		// if(!this.props.isDataAvailable){
		//	console.log(this.props.getTimeframe(this.state.selectedMonth));
		this.props.actions.dae_loadIncidentsDrilldownData(this.props.product, 'monthly', this.props.getTimeframe(this.state.selectedMonth));
		 //}
	}
	 toggle = () => {
	 	this.setState(prevState => ({
	 		isSelectDropdownOpen: !prevState.isSelectDropdownOpen
	 	}));
	 }
	 toggleCategory = () => {
	 	this.setState(prevState => ({
	 		isCategoryDropdownOpen: !prevState.isCategoryDropdownOpen
	 	}));
	 }

	 change = (month) => {

	 	this.setState({
	 		...this.state,
	 		selectedMonth: month
		 });
			 this.props.actions.dae_loadIncidentsDrilldownData(this.props.product, 'monthly', this.props.getTimeframe(month))
			 this.props.actions.dae_invalidateMonthlyIncidentsDrilldownData();

	 }
	 changecategory = (category) => {

	 	this.setState({
	 		...this.state,
	 		selectedCategory: category
	 	});
	this.props.mapApiDataToComponentData(this.props.incidentsData, category)
	 }

	render(){
		console.log('monthly render called with props.............');
		console.log(this.props);
		if(this.props.isDataAvailable){
			
			let data = this.props.mapApiDataToComponentData(this.props.incidentsData,this.state.selectedCategory);
			return <div>
				<Row>
					<Col lg={12} className="text-left">
						<label>Timeframe</label>
						<Dropdown className={styles.teamDropDownButton} isOpen={this.state.isSelectDropdownOpen} toggle={this.toggle}>
							<DropdownToggle caret>
								{this.state.selectedMonth}
							</DropdownToggle>
							<DropdownMenu>
								<DropdownItem header>Teams</DropdownItem>
								{
									this.props.timeframes.map(team => {
									return (<DropdownItem key={team} onClick={() => this.change(team)}>{team}</DropdownItem>);
								})}
							</DropdownMenu>
						</Dropdown>
                    &emsp;
						<label> category</label>
						<Dropdown className={styles.teamDropDownButton} isOpen={this.state.isCategoryDropdownOpen} toggle={this.toggleCategory}>
							<DropdownToggle caret>
								{this.state.selectedCategory}
							</DropdownToggle>
							<DropdownMenu>
								<DropdownItem header>Teams</DropdownItem>
								{this.props.categories.map(team => {
									return (<DropdownItem key={team} onClick={() => this.changecategory(team)}>{team}</DropdownItem>);
								})}
							</DropdownMenu>
						</Dropdown>
					</Col>
				</Row>
				<Row>
					<Col lg={10} className="text-center">
						<Category category={this.state.selectedCategory} data={data}></Category>
					</Col>
					<Col lg={2} className="text-center">
						<Row>
							<Col lg={12}>
								<Card name="Created" value={this.props.incidentsData.data.created} />
							</Col>
						</Row>
						<Row>
							<Col lg={12}>
								<Card name="Resolved" value={this.props.incidentsData.data.resolved}/>
							</Col>
						</Row>
					</Col>
				</Row>
			</div>;
		}
            
		else    
			return <Loading loading={true}/>;
	}
}

function Category(props) {
        console.log('props of trend component');
        console.log(props);
        const value = props.category;
        if (value === 'RCA')
            return <Area data={props.data} key={props.data}> 
                    </Area>
		 else
		 	return <Bar data={props.data}  key={props.data}></Bar>
       

    }