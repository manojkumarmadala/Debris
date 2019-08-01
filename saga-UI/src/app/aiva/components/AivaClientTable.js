import React from 'react';
import {Table} from 'reactstrap';
import AivaClientItem from './AivaClientItem';
import styles from './AIVA.module.css';


function AivaClientTable(props) {
    return(
        <div>
            <Table className={styles.Table}>
                <thead>
                    <th>Client</th>
                    <th>AIVA sessions started</th>
                    <th>Visits</th>
                    <th>Engaged customer sessions</th>
                    <th>Chat escalations</th>
                    <th>Chat invites</th>                    
                </thead>
                <tbody>
                    {
                        props.values.clients.map(element => {
                            return (
                                <AivaClientItem key={element.name} item={element}> </AivaClientItem>
                        );
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
}


export default AivaClientTable;