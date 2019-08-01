import React from 'react';

function AivaClientItem(props) {
    var clients = props.item;
    return(
        <tr key={clients.name}>
        <td key={clients.name}>{clients.name}</td>
        <td key={clients.metrics.aivaSessionsStarted}>{clients.metrics.aivaSessionsStarted}</td>
        <td key={clients.metrics.visits}>{clients.metrics.visits}</td>
        <td key={clients.metrics.engagedCustomerSessions}>{clients.metrics.engagedCustomerSessions}</td>
        <td key={clients.metrics.chatEscalations}>{clients.metrics.chatEscalations}</td>
        <td key={clients.metrics.chatInvites}>{clients.metrics.chatInvites}</td>            
        </tr>
    );
}

export default AivaClientItem;
