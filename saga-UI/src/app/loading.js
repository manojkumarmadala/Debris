import React from 'react';
import { ScaleLoader } from 'react-spinners';
import styles from './loading.module.css';

export default function Loading(props) {
	if(props.loading){
		return (
			// <div>
			// 	<h2>Loading...</h2>
			// </div>
			<div className={styles.loadingIcon}>
				<ScaleLoader
					sizeUnit={'px'}
					size={20}
					color={'#F5A623'}
					loading={props.loading}
				/>
			</div> 
		);
	}
	else
		return null;
}