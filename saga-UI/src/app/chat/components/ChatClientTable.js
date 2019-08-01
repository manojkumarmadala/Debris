import React from 'react';
import {Table} from 'reactstrap';
import ChatClientItem from './ChatClientItem'
import styles from './Chat.module.css';


function ChatClientTable(props) {    
    return(
        <div>
            <Table className={styles.Table}>
                <thead>
                    <th>Client</th>
                    <th>Visitors</th>
                    <th>HotLead Visitors</th>
                    <th>Invited Visitors</th>
                    <th>Accepted Visitors</th>
                    <th>Chats Started</th>
                    <th>Interactive Chats</th>
                    <th>Invited Visits</th>
                    <th>Accepted Visits</th>
                    <th>Page Views</th>
                    <th>HotLeads</th>
                    <th>Accepted Event Count</th>
                </thead>
                <tbody>
                    {
                        props.values.clients.map(element => {
                            return (
                                <ChatClientItem key={element.name} item={element}> </ChatClientItem>
                        );
                        })
                    }
                </tbody>
            </Table>
        </div>
    );    
}


export default ChatClientTable;