import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../state/actions';
import IncidentsHeatMap from '../components/HeatMap';

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
};

const mapStateToProps = (state) => {
	return {
		heatMapData : state.incidentsHeatMapReducer.heatMapData,
		isDataAvailable : state.incidentsHeatMapReducer.isDataAvailable,
	};
};

export default connect(mapStateToProps, mapDispatchToProps) (IncidentsHeatMap);