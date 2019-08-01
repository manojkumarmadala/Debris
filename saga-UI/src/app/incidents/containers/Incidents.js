import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../state/actions';
import Incidents from '../components/Incidents';

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
};

const mapStateToProps = (state) => {
	return {
	
		isIncidentsDataAvailable: state.incidentsReducer.isIncidentsDataAvailable,
		incidentsData: state.incidentsReducer.incidentsData,
	};
};

export default connect(mapStateToProps, mapDispatchToProps) (Incidents);