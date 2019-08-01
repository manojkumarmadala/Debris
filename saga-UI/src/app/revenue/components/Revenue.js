import React from 'react';
import {Row,Col} from 'reactstrap';
import RevenueTable from './RevenueTable';
import RevenueGraph from './RevenueGraph';
import styles from './Revenue.module.css';
import Loading from '../../loading';

class Revenue extends React.Component{
	constructor(props){
		super(props);
		//console.log('Competition constructor called');
		this.state={Loading:true};
	}
	componentDidMount()
	{
		//console.log(this.props);
		if (!this.props.isRevenueDataAvailable) {
			this.props.actions.loadRevenueData();
			
		}
	}

	render() {
		if (this.props.isRevenueDataAvailable){
			let table = null;
			// console.log('revenue props are');
			// console.log(this.props);
			if(this.props.renderTable !== false){
				table = (<Row className={styles.tablecontainer}>
					<Col lg={12}>
						<RevenueTable values={this.props.revenueData.data} ></RevenueTable>  
					</Col>
				</Row>);
			}

			return (
				<div>
					<Loading loading={false}/>
					<Row className={styles.graph}>
						<Col lg={12}>
							<RevenueGraph values={this.props.revenueData.data} chartHeight={this.props.chartHeight} labelSteps={this.props.labelSteps}></RevenueGraph>
						</Col>
					</Row>
					
					{table}
				</div>
			);
		}
		else{
			return (
				<Loading loading={true}/>
			);
		}
	}
}

export default Revenue;