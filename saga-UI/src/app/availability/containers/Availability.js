import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../state/actions';
import Availability from '../components/Availability';


const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
};
  

const mapStateToProps = (state, props) => {
	return {
		isAvailabilityDataAvailable : state.availabilityReducer.isAvailabilityDataAvailable,
		availabilityData : state.availabilityReducer.availabilityData.data,
		chartHeight: props.chartHeight
	};
};

export default connect(mapStateToProps, mapDispatchToProps) (Availability);