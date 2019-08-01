import React, { Component } from 'react';

class  RevenueItem extends Component {
   
	render(){
		return( 
   
  
			(this.props.item.clients).map(client=>{
				return(
					<tr key={client.name}>
						<td key={this.props.item.name}> {this.props.item.name}</td>
						<td key={client.name}>{client.name}</td>
						<td key={client.revenue}>{client.revenue.toLocaleString('en')}</td>
					</tr>

				);
			})     
    
   
		);}
}

export default RevenueItem;


