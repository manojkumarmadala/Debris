import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../state/actions';
import Chat from '../components/Chat';

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
};
  

const mapStateToProps = (state) => {
	return {		
		isChatFunnelDataAvailable: state.chatReducer.isChatFunnelDataAvailable,
		chatData: state.chatReducer.chatData
	};
};

export default connect(mapStateToProps, mapDispatchToProps) (Chat);