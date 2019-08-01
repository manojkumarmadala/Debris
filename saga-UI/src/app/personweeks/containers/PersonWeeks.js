import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../state/actions';
import PersonWeeks from '../components/PersonWeeks';

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
};

const mapStateToProps = (state) => {
	return {
		isPersonWeeksDataAvailable: state.personWeeksReducer.isPersonWeeksDataAvailable,
		personWeeksData: state.personWeeksReducer.personWeeksData.data,
		loading:state.personWeeksReducer.loading,
		isPersonWeeksUpdated: state.personWeeksReducer.isPersonWeeksUpdated,
		personWeeksStatus:state.personWeeksReducer.personWeeksStatus
	};
};

export default connect(mapStateToProps, mapDispatchToProps) (PersonWeeks);