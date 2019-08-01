import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../state/actions';
import Competition from '../components/Competition';


const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
};
  

const mapStateToProps = (state, props) => {
	return {
		...props,
		competitionData: state.competitionReducer.competitionData,
		newsData: state.competitionReducer.competitionNewsData,
		isCompetitionDataAvailable: state.competitionReducer.isCompetitionDataAvailable,
		isNewsDataAvailable: state.competitionReducer.isNewsDataAvailable,
		renderCompetitionTable: props.renderCompetitionTable
	};
};

export default connect(mapStateToProps, mapDispatchToProps) (Competition);