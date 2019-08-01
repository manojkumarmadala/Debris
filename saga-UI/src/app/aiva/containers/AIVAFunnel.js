import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../state/actions';
import AIVA from '../components/AIVA';

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
};
  

const mapStateToProps = (state) => {
	return {		
		isAivaFunnelDataAvailable: state.aivaReducer.isAivaFunnelDataAvailable,
		aivaData: state.aivaReducer.aivaData
	};
};

export default connect(mapStateToProps, mapDispatchToProps) (AIVA);