import React from 'react';
import {Row,Col} from 'reactstrap';
import Loading from '../../loading'
import AIVATable from './AivaClientTable';
import styles from './AIVA.module.css';

class AIVAFunnel extends React.Component {
    constructor(props) {
        super(props);
        console.log('AIVA constructor called');
        this.state={Loading:true};
    }

    componentDidMount() {
        if(!this.props.isAivaFunnelDataAvailable) {
            this.props.actions.loadAivaFunnelData();
        }
    }

    render() {
        if(this.props.isAivaFunnelDataAvailable){
            return (
                <div>
                    <Loading loading={false}/>
                    <Row>
                        <h3>Aiva</h3>
                    </Row>
                    <Row className={styles.tablecontainer}>
                        <Col lg={8}>
                            <AIVATable values={this.props.aivaData.data}></AIVATable>
                        </Col>
                    </Row>
                </div>
            );
        }
        else {
            return (
				<div>
                   <Loading loading={true}/>
                </div>
			);
        }        
    }
}

export default AIVAFunnel;
