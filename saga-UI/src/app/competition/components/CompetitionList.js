import React from 'react';
import {Table} from 'reactstrap';
import CompetitionItem from './CompetitionItem';
import styles from './Competition.module.css';

export default function CompetitionList(props){
	return(
		<div>
			<div className={styles.competition}>{props.title}</div>
			<div>
				<Table bordered hover className={styles.whiteBG}>
					<thead>
						<tr>
							{
								Object.keys(props.items[0]).map(headder => {
									if(headder!=='id')
										return <th key={headder}>{headder}</th>;
									return null;
								})
							}
						</tr>
					</thead>
					<tbody>
						{
							props.items.map (item => (
								<CompetitionItem item={item}
									key={item.id}
								/>
							))
						}
					</tbody>
				</Table>
			</div>
		</div>
	);
}