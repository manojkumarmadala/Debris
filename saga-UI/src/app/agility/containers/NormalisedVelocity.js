import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../state/actions';
import NormalisedVelocity from '../components/NormalisedVelocity';

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
};

const mapStateToProps = (state) => {
	return {
		agilityData : state.agilityReducer.agilityData,
		isAgilityDataAvailable : state.agilityReducer.isAgilityDataAvailable,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NormalisedVelocity);