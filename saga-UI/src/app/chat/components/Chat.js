import React from 'react';
import {Row,Col} from 'reactstrap'
import Loading from '../../loading'
import Filter from '../../filter/filter';
import ChatFunnelGraph from './chatFunnelGraph';
import ChatClientTable from './ChatClientTable';
import styles from './Chat.module.css'

class Chat extends React.Component {

    constructor(props) {
        super(props);
        console.log('Chat constructor called');
        this.state = {Loading: true};
    }

    componentDidMount() {
        if(!this.props.isChatFunnelDataAvailable) {
            this.props.actions.loadChatFunnelData();
        }
    }

    render() {
        if(this.props.isChatFunnelDataAvailable){
            return (
                <div>
                    <Loading loading={false}/>                    
                    <Row>
                        <h3>Chat</h3>
                    </Row>                      
                    <Row>
						<Col lg={8}>
							<ChatFunnelGraph id={'funnelChart'}/>
						</Col>
					</Row>                  
                    <Row className={styles.tablecontainer}>
                        <Col lg={8}>
                            <ChatClientTable values={this.props.chatData.data}></ChatClientTable>
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

export default Chat;