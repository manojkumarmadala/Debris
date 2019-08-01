import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../state/actions';
import Trends from '../components/Trends';
import daeData from '../../dae-data.json';

const mapDispatchToProps = dispatch => {
	return {
		actions : bindActionCreators(actions, dispatch)
	};
};

const mapStateToProps = (state, props) => {
	return {
		...props,
		teams: daeData.teams,
		trends: daeData.trends
	};
};



export default connect(mapStateToProps, mapDispatchToProps) (Trends);