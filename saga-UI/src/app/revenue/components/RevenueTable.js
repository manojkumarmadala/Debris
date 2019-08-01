import React,{Component} from 'react';
import {Table} from 'reactstrap';
import RevenueItem from './RevenueItem';
import styles from './Revenue.module.css';

class RevenueTable extends Component {
	render(){
		return(
			<div>
				<Table className={styles.Table}>
					<thead>
						<tr>
							<th>Product</th>
							<th>Client</th>
							<th>Revenue($)</th>
						</tr>
					</thead>
					<tbody>
						{
							this.props.values.hits.hits[1]._source.Product.map(element => {
                            
								return ( <RevenueItem key = {element.name} item = {element}  > </RevenueItem>);
                                 
							})
						}
					</tbody>
                 
				</Table> 
            
			</div>
		);
		
   
	}
}

export default RevenueTable;

