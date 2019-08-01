import React from 'react';

function ChatClientItem(props) {
    var clients = props.item;
    return(
        <tr key={clients.name}>
        <td key={clients.name}>{clients.name}</td>
        <td key={clients.metrics.MtPEUVisitor}>{clients.metrics.MtPEUVisitor}</td>
        <td key={clients.metrics.MtHLUVisitor}>{clients.metrics.MtHLUVisitor}</td>
        <td key={clients.metrics.MtEUInvitesOfferedVisitor}>{clients.metrics.MtEUInvitesOfferedVisitor}</td>
        <td key={clients.metrics.MtEngAcceptedVisitor}>{clients.metrics.MtEngAcceptedVisitor}</td>
        <td key={clients.metrics.MtChatStarted}>{clients.metrics.MtChatStarted}</td>
        <td key={clients.metrics.MtInteractedChat}>{clients.metrics.MtInteractedChat}</td>
        <td key={clients.metrics.MtEUInvitesOfferedVisit}>{clients.metrics.MtEUInvitesOfferedVisit}</td>
        <td key={clients.metrics.MtEngAcceptedVisit}>{clients.metrics.MtEngAcceptedVisit}</td>
        <td key={clients.metrics.MtPETotalEvent}>{clients.metrics.MtPETotalEvent}</td>
        <td key={clients.metrics.MtHLTotalEvent}>{clients.metrics.MtHLTotalEvent}</td>
        <td key={clients.metrics.MtEngAcceptedEvent}>{clients.metrics.MtEngAcceptedEvent}</td>
        </tr>
    );
}

export default ChatClientItem;