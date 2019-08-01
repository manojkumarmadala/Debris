import React from 'react';
import {Row, Col} from 'reactstrap';
//import {Image} from 'react-bootstrap';
import styles from './Competition.module.css';

export default function NewsList(props){
	let count = 0;
	return (
		props.news.map(item => {
			if(count>4)
				return null;
			else{
				count++;
				return (
					<Row key={item.id} className={[styles.whiteBG, styles.newsItem].join(' ')}>
						{/* <Col md={2}>
							<Image src={require(`${item.image}`)} thumbnail></Image>
						</Col> */}
						<Col md={12}>
							<h5 style={{'fontSize':'14px','fontWeight':'bold'}}>{item.headder}</h5>
							{/* <p>Summary</p> */}
							<p style={{'fontSize':'14px'}}>{item.article}</p>
						</Col>
					</Row>
				);
			}
		})
	);
}