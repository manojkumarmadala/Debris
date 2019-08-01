import React from 'react';
import styles from './Card.module.css';

//this component will render a card based on the data passed
export default function Card(props){
	return (<div>
		<p className={styles.para}>{props.name}</p>
		<div  className={styles.dataBlock}>{props.value}</div> 
	</div>);
	
}